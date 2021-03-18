const express = require('express')
const server = express()

const nunjucks = require("nunjucks")
const recipes = require("./data.js")

server.set("view engine", "njk")
server.use(express.static('public'))

nunjucks.configure("views", {
  express: server
})

server.listen(5000, () => {
  console.log("Server is running")
})

server.get("/", (req, res) => {
  res.render("index", { recipes })
})

server.get("/about", (req, res) => {
  res.render("about")
})

server.get("/recipes", (req, res) => {
  res.render("recipes", { recipes })
})

server.get("/recipes/:index", (req, res) => {
  recipeIndex = req.params.index; // recipe index recebe oq eu passar em /recipes/aqui.
  const recipe = recipes[recipeIndex]// passando um numero no recipeIndex, vou pegar a posição no array do recipes

  res.render("recipe", { recipe })
})