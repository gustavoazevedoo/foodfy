const express = require("express")
const routes = express.Router()

const foodfy = require("./app/controllers/foodfy")
const admin = require("./app/controllers/admin")

routes.get("/", (req, res) => {
  return res.redirect("/foodfy")
})
routes.get("/foodfy", foodfy.index)
routes.get("/foodfy/about", foodfy.about)
routes.get("/foodfy/recipes", foodfy.recipes)
routes.get("/foodfy/recipes/:index", foodfy.recipe)

routes.get("/admin", (req, res) => {
  res.redirect("/admin/recipes")
})
routes.get("/admin/recipes", admin.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", admin.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", admin.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", admin.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", admin.post); // Cadastrar nova receita
routes.put("/admin/recipes", admin.put); // Editar uma receita
routes.delete("/admin/recipes", admin.delete); // Deletar uma receita

module.exports = routes