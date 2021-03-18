const data = require("../data.js")
const recipes = require("../data.js")

exports.index = (req, res) => {
  return res.render("admin/index", { recipes })
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