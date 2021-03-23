const fs = require("fs")
const data = require("../data.json")

exports.index = (req, res) => {
  return res.render("admin/index", { recipes: data.recipes })
}

exports.create = (req, res) => {
  return res.render("admin/create")
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body)
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields")
    }
  }

  const { image, title, author, ingredients, steps, information } = req.body
  
  let id = 1
  const lastRecipe = data.recipes[data.recipes.length - 1]

  if (lastRecipe) {
    id = lastRecipe.id + 1
  }

  data.recipes.push({
    id,
    image,
    title,
    author,
    ingredients,
    steps,
    information
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!")

    return res.redirect("/admin/recipes")
  })
}

exports.show = (req, res) => {
  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return recipe.id == id
  })
  
  return res.render("admin/recipe", { recipe: foundRecipe })
}

exports.edit = (req, res) => {
  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return id == recipe.id
  })

  if(!foundRecipe) return res.send("Recipe not found!")

  return res.render("admin/edit", { recipe: foundRecipe })
}

exports.put = (req, res) => {
  const { id } = req.body
  let index = 0

  const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    if (recipe.id == id) {
      index = foundIndex
      return true
    }
  })

  if(!foundRecipe) return res.send("Recipe not found!")

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id)
  }

  console.log(req.body)

  data.recipes[index] = recipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Update recipe error")

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.delete = (req, res) => {
  const { id } = req.body

  const filteredRecipe = data.recipes.filter((recipe) => {
    return recipe.id != id
  })

  if(!filteredRecipe) return res.send("Recipe not found!")

  data.recipes = filteredRecipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Delete recipe error!")

    return res.redirect("/admin/recipes")
  })
}