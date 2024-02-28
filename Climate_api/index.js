const PORT = 7000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const stroeArticals = []; 
app.get("/", (req, res) => {
  res.json("Hola! Welcome to Climate change API");
});

app.get("/news", (req, res) => {
 

  // axios.get("https://science.nasa.gov/climate-change/")
  axios.get("https://www.theguardian.com/environment/climate-crisis")
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text().trim();
        const url = $(this).attr('href');

        stroeArticals.push({
          title,
          url
        });
      });

      res.json(stroeArticals);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
