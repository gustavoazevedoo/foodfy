const recipes = require("../data")

exports.index = (req, res) => {
  res.render("foodfy/index", { recipes })
}

exports.about = (req, res) => {
  res.render("foodfy/about")
}

exports.recipes = (req, res) => {
  res.render("foodfy/recipes", { recipes })
}

exports.recipe = (req, res) => {
  recipeIndex = req.params.index; // recipe index recebe oq eu passar em /recipes/aqui.
  const recipe = recipes[recipeIndex]// passando um numero no recipeIndex, vou pegar a posição no array do recipes

  res.render("foodfy/recipe", { recipe })
}