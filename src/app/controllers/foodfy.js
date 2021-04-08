const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render("foodfy/index", { recipes })
    })
  },
  about(req, res) {
    return res.render("foodfy/about")
  },
  recipes(req, res) {
    Recipe.all((recipes) => {
      return res.render("foodfy/recipes", { recipes })
    })
  },
  recipe(req, res) {
    Recipe.findRecipe(req.params.id, (recipe) => {

      return res.render(`foodfy/recipe`, { recipe })
    })
  },
  chefs(req, res) {
    Chef.all((chefs) => {
      return res.render("foodfy/chefs", { chefs })
    })
  },
  search(req, res) {
    let { filter } = req.query

    if (filter) {
      Recipe.findBy(filter, (recipes) => {
        if (recipes[0]) {
          return res.render("foodfy/search", {recipes, filter})
        } else {
          return res.send("Recipe not found!")
        }
      })
    } else {
      Recipe.all((recipes) => {
        filter = "todos"
        return res.render("foodfy/search", { recipes, filter })
      })
    }
  }
}