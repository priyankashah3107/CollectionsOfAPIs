const PORT = 7000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const stroeArticals = []; 

// Fetching Climate Data from multiple source 

const newspapers = [
     
  {
    title: "who",
    address: "https://www.who.int/news-room/fact-sheets/detail/climate-change-and-health",
    base: ''

  },

    {
      title: "TheGudian",
      address: "https://www.theguardian.com/environment/climate-crisis",
      base: ''

    },

    {
      title: "CNN",
      address: "https://edition.cnn.com/world/cnn-climate",
      base: ''

    },
     
    {
      title: "UnitedNations",
      address: "https://news.un.org/en/news/topic/climate-change",
      base: ''

    },

    {
      title: "TheHindu",
      address: "https://www.thehindu.com/sci-tech/energy-and-environment/",
      base: ''

    },

    {
      title: "NYTimes",
      address: "https://www.thehindu.com/sci-tech/energy-and-environment/",
      base: ''

    },

    {
      title: "climatechangenews",
      address: "https://www.climatechangenews.com/",
      base: ''

    },

    
    {
      title: "nbcnews",
      address: "https://www.nbcnews.com/climate-in-crisis",
      base: ''

    },
  
    {
      name: "Thetimes",
      address: "https://www.thetimes.co.uk/environment/climate-change",
      base: ''
    },

    {
      name: "The Economics Times",
      address: "https://economictimes.indiatimes.com/topic/climate-change",
      base: ''
    },
    {
      name: "Telegraph",
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

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
