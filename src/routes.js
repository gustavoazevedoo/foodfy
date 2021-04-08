const express = require("express")
const routes = express.Router()

const foodfy = require("./app/controllers/foodfy")
const recipes = require("./app/controllers/recipes")
const chefs = require("./app/controllers/chefs")

routes.get("/", (req, res) => {
  return res.redirect("/foodfy")
})
routes.get("/foodfy", foodfy.index)
routes.get("/foodfy/about", foodfy.about)
routes.get("/foodfy/recipes", foodfy.recipes)
routes.get("/foodfy/chefs", foodfy.chefs)
routes.get("/foodfy/recipes/:id", foodfy.recipe)
routes.get("/foodfy/search", foodfy.search)

routes.get("/admin", (req, res) => {
  res.redirect("/admin/recipes")
})
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.get("/admin/chefs", chefs.index); // Mostrar a lista de receitas
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de uma receita
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de receita
routes.post("/admin/chefs", chefs.post); // Cadastrar nova receita
routes.put("/admin/chefs", chefs.put); // Editar uma receita
routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita

module.exports = routes