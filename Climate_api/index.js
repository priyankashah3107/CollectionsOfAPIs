const PORT = 7000

const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

app.get("/", (req, res) => {
  res.json("Hola! Welcome to Climate change API")
} )

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})