
const express = require("express")
const cheerio = require("cheerio")
const axios = require("axios")
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 7777;

const app = express()
let recipeCollections = []

app.get("/", (req, res) => {
   res.send(`<h1> Hiiiiiiiiii Welcome to my Food Recippeee API `)
})

app.get('/recipe', (req, res) => {
    axios.get("https://www.theguardian.com/tone/recipes")
             .then(response => {
              const html  = response.data;
              // console.log(html)
              // using cheerio to read the html contains from website
             
              const $ = cheerio.load(html)

              $(`a:contains("recipe")`, html).each( function() {
                const title =  $(this).text().trim()
                const url = $(this).attr('href')
                const absoluteUrl = url.startsWith('/') ? `https://www.theguardian.com${url}` : url;

                recipeCollections.push({
                  title, 
                  url: absoluteUrl
                })
              })

              res.json(recipeCollections)

             })
})

app.listen(port, () => {
  console.log(`This is Running of PORT http://localhost:${port}`)
})