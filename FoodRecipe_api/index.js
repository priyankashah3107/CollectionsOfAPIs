
const express = require("express")
const cheerio = require("cheerio")
const axios = require("axios")
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 7777;

const app = express()
let recipes = []

let recipeCollections = [

  {
    name: "IndianFood",
    address: "https://www.vegrecipesofindia.com/recipes/",
    base: ""
  },

  {
    name: "EuropianFood",
    address: "https://www.theguardian.com/tone/recipes",
    base: ""
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
    base: ""
  },

  {
    name: "VeganFood",
    address: "https://www.loveandlemons.com/vegan-recipes/",
    base: ""
  },

  {
    name: "VegitarianFood",
    address: "https://cooking.nytimes.com/topics/vegetarian",
    base: "https://cooking.nytimes.com/topics/vegetarian"
  },
]

app.get("/", (req, res) => {
   res.send(`<h1> Hiiiiiiiiii Welcome to my Food Recippeee API `)
})

app.get('/recipe', (req, res) => {
    axios.get("https://cooking.nytimes.com/topics/vegetarian")
             .then(response => {
              const html  = response.data;
              // console.log(html)
              // using cheerio to read the html contains from website
             
              const $ = cheerio.load(html)

              $(`a:contains("recipe")`, html).each( function() {
                const title =  $(this).text().trim()
                const url = $(this).attr('href')
                const absoluteUrl = url.startsWith('/') ? `https://www.theguardian.com${url}` : url;

                recipes.push({
                  title, 
                  url: absoluteUrl
                })
              })

              res.json(recipes)

             })
})

app.listen(port, () => {
  console.log(`This is Running of PORT http://localhost:${port}`)
})