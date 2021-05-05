const Recipe = require("../models/Recipe")

module.exports = {
  async index(req, res) {
    const results = await Recipe.all()
    const recipes = results.rows
    
    return res.render("admin/recipes/index", { recipes })
  },
  async create(req, res) {
    const results = await Recipe.chefsSelectOptions()
    const options = results.rows

    return res.render("admin/recipes/create", {chefOptions: options})
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
  async show(req, res) {
    const results = await Recipe.findRecipe(req.params.id)
    const recipe = results.rows[0]

    return res.render(`admin/recipes/recipe`, { recipe })
  },
  async edit(req, res) {

    let results = await Recipe.findRecipe(req.params.id)
    const recipe = results.rows[0]

    results = await Recipe.chefsSelectOptions()
    const options = results.rows

    return res.render(`admin/recipes/edit`, { recipe, chefOptions: options })
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