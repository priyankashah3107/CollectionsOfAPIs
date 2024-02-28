const PORT = 7000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
let stroeArticals = []; 

// Fetching Climate Data from multiple source 

let newspapers = [
     
  {
    name: "who",
    address: "https://www.who.int/news-room/fact-sheets/detail/climate-change-and-health",
    base: ''

  },

    {
      name: "TheGudian",
      address: "https://www.theguardian.com/environment/climate-crisis",
      base: ''

    },

    {
      name: "CNN",
      address: "https://edition.cnn.com/world/cnn-climate",
      base: ''

    },
     
    {
      name: "UnitedNations",
      address: "https://news.un.org/en/news/topic/climate-change",
      base: ''

    },

    {
      name: "TheHindu",
      address: "https://www.thehindu.com/sci-tech/energy-and-environment/",
      base: ''

    },

    {
      name: "NYTimes",
      address: "https://www.thehindu.com/sci-tech/energy-and-environment/",
      base: ''

    },

    {
      name: "climatechangenews",
      address: "https://www.climatechangenews.com/",
      base: ''

    },

    
    {
      name: "nbcnews",
      address: "https://www.nbcnews.com/climate-in-crisis",
      base: ''

    },
  
    {
      name: "Thetimes",
      address: "https://www.thetimes.co.uk/environment/climate-change",
      base: ''
    },

    {
      name: "TheEconomicsTimes",
      address: "https://economictimes.indiatimes.com/topic/climate-change",
      base: ''
    },
    {
      name: "telegraph",
      address: "https://www.telegraph.co.uk/climate-change/",
      base: 'https://www.telegraph.co.uk'
    }

]

// travering on each oject so we can easily get the value of everyObect

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)  // getting each links 
    .then(response => {
      const html = response.data;

      const $ = cheerio.load(html)

      $('a:contains("climate")', html).each( function () {
          const title = $(this).text().trim().replace(/\s+/g, ' ');
          const url = $(this).attr('href');

          stroeArticals.push({
            title,
            url,
          })
      })

    })
})

app.get("/", (req, res) => {
  res.json("Hola! Welcome to Climate change API");
});

app.get("/news", (req, res) => {
 

  // axios.get("https://science.nasa.gov/climate-change/")
  // axios.get("https://www.telegraph.co.uk/climate-change/")
  //   .then(response => {
  //     const html = response.data;
  //     const $ = cheerio.load(html);

  //     $('a:contains("climate")', html).each(function () {
  //       const title = $(this).text().trim();
  //       const url = $(this).attr('href');

  //       stroeArticals.push({
  //         title,
  //         url
  //       });
  //     });

    //   res.json(stroeArticals);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json({ error: "Internal Server Error" });
    // });
     
    res.json(stroeArticals)

});

// Now I want to getting the information form the Individual news Sources

app.get("/news/:newspaperId", (req, res) => {
      const newspaperId = req.params.newspaperId;   
      // // console.log(newspaperId)
      // const newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperId)
      let newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].address;
      let newspaperBase = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].base

      // // console.log(newspaperBase)
      // // console.log(newspaperAddress)

   

      axios.get(newspaperAddress)
         
           .then(response => {
             const html = response.data;

             const $ = cheerio.load(html)
             let specificArticle = []
             $('a:contains("climate")', html).each( function() {
                

                const title = $(this).text().trim().replace(/\s+/g, ' ');
                const url = $(this).attr('href')

                specificArticle.push({
                  title,
                  url: newspaperBase + url,
                   source: newspaperId
                })
             })
             res.json(specificArticle)
           })
           .catch((err) =>{
            console.log(err)
           })
        
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
