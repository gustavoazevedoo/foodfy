const Recipe = require("../models/Recipe")

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render("admin/recipes/index", { recipes })
    })
  },
  create(req, res) {
    Recipe.chefsSelectOptions((options) => {
      return res.render("admin/recipes/create", {chefOptions: options})
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
  
    Recipe.createRecipe(req.body, (recipe) => {
      return res.redirect(`admin/recipes/${recipe.id}`)
    })
   
  },
  show(req, res) {
    Recipe.findRecipe(req.params.id, (recipe) => {

      return res.render(`admin/recipes/recipe`, { recipe })
    })
  },
  edit(req, res) {
    Recipe.findRecipe(req.params.id, (recipe) => {
      Recipe.chefsSelectOptions((options) => {
        return res.render(`admin/recipes/edit`, { recipe, chefOptions: options })
      })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    Recipe.update(req.body, () => {
      return res.redirect(`recipes/${req.body.id}`)
    })
  },
  delete(req, res) {
    Recipe.deleteRecipe(req.body.id, () => {
      return res.redirect("/admin")
    })
  }

}