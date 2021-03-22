const fs = require("fs")
const data = require("../data.json")

exports.index = (req, res) => {
  return res.render("admin/index", { recipes: data.recipes })
}

exports.create = (req, res) => {
  return res.render("admin/create")
}

exports.show = (req, res) => {
  const { id } = req.params

  recipe = data[id]
  
  return res.render("admin/recipe", { recipe })
}

exports.edit = (req, res) => {
  const { id } = req.params

  recipe = data[id]

  return res.render("admin/edit", { recipe })
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