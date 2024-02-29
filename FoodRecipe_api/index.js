
const express = require("express")
const cheerio = require("cheerio")
const axios = require("axios")
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 7777;

const app = express()
app.use(express.json())
let recipes = []
let recipeCollections = []

let allcountryrecipe = [

  {
    name: "IndianFood",
    address: "https://www.vegrecipesofindia.com/recipes/",
    base: ''
  },

  {
    name: "EuropianFood",
    address: "https://www.theguardian.com/tone/recipes",
    base: ''
  },

  {
    name: "ItalianFood",
    address: "https://www.aheadofthyme.com/recipes/",
    base: ""
  },

  {
    name: "KoreanFood",
    address: "https://gypsyplate.com/the-best-korean-recipes/",
    base: ""
  },

  {
    name: "TurkishFood",
    address: "https://www.deliciousmagazine.co.uk/cuisine/turkish-recipes/",
    base: ""
  },

  {
    name: "ChineseFood",
    address: "https://www.tasteofhome.com/collection/chinese-food-recipes/",
    base: ""
  },

  {
    name: "RussianFood",
    address: "https://insanelygoodrecipes.com/russian-recipes/",
    base: ""
  },

  {
    name: "MexiconFood",
    address: "https://www.mexicoinmykitchen.com/recipes/",
    base: ""
  },

  {
    name: "ThaiFood",
    address: "https://hungryinthailand.com/easy-thai-recipes/",
    base: ""
  },

  {
    name: "FrenchFood",
    address: "https://www.saveur.com/classic-french-recipes/",
    base: ""
  },

  {
    name: "japaneseFood",
    address: "https://pickledplum.com/27-japanese-recipes/",
    base: ""
  },

  {
    name: "PakistaniFood",
    address: "https://www.pakistaneats.com/",
    base: ""
  },

  {
    name: "AustralianFood",
    address: "https://www.deliciousmagazine.co.uk/cuisine/australian-recipes/",
    base: ''
  },

  {
    name: "VeganFood",
    address: "https://www.loveandlemons.com/vegan-recipes/",
    base: ''
  },

  {
    name: "VegitarianFood",
    address: "https://cooking.nytimes.com/topics/vegetarian",
    base: "https://cooking.nytimes.com/topics/vegetarian"
  },
]

// travse on each object 


const fetchRecipes = async () => {
  try {

    await Promise.all(allcountryrecipe.map(async (collectionsrecipe) => {

      const response = await axios.get(collectionsrecipe.address);
         
      const html = response.data
      const $ = cheerio.load(html)

        $('a:contains("recipe")', html).each( function() {
            
          let title = $(this).text().trim().replace(/\s+/g, ' ');
        const url = $(this).attr('href')
           
        recipeCollections.push({
          title, 
          url: collectionsrecipe.base + url,
          source: collectionsrecipe.name
        })

        })
    }))
    
  } catch (error) {
     console.log("Error while Fetching the recipes", error.message)
  }
}





app.get("/", (req, res) => {
   res.send(`<h1> Hiiiiiiiiii Welcome to my Food Recippeee API `)
})


app.get('/recipe', async (req, res) => {
  // Calling fetchRecipes and wait for it to complete
  await fetchRecipes();
  res.json(recipeCollections);
});



app.get("/recipe/:recipeId", (req, res) => {

   const recipeId = req.params.recipeId;
  //  console.log(recipeId)
  const individualRecipe = []
   const particularRecipe = allcountryrecipe.find( recipe => recipe.name === recipeId)
   // base case 

   if(!particularRecipe) {
    res.status(404).json({error: "Recipe not Found"});
   }

   const particularAddress = particularRecipe.address;
    // console.log(particularAddress)
    const particularBase = particularRecipe.base
    axios.get(particularAddress) 
             .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                 
                $('a:contains("recipe")', html).each( function() {
                    const title = $(this).text().trim().replace(/\s+/g, " ");
                    const url = $(this).attr('href')

                      individualRecipe.push({
                        title,
                        url: particularBase !== ' ' ? particularBase + url : url,
                        source: recipeId
                      })
                })

                res.json(individualRecipe)
             })

             .catch((err) => {
                  console.log(err.message)
             })
})



app.listen(port, () => {
  console.log(`This is Running of PORT http://localhost:${port}`)
})