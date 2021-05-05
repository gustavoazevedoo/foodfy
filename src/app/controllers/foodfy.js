const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
  async index(req, res) {
    const results = await Recipe.all()
    const recipes = results.rows
    
    return res.render("foodfy/index", { recipes })
  },
  about(req, res) {
    return res.render("foodfy/about")
  },
  recipes(req, res) {
    let { filter, page, limit } = req.query
    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          page,
          totalPages: Math.ceil(recipes[0].total / limit)
        }
        
        return res.render("foodfy/recipes", { recipes, filter, pagination })
      }
    }

    Recipe.paginate(params)
  },
  async recipe(req, res) {
    const results = await Recipe.findRecipe(req.params.id)
    const recipe = results.rows[0]

    return res.render(`foodfy/recipe`, { recipe })
  },
  async chefs(req, res) {
    const results = await Chef.all()
    const chefs = results.rows

    return res.render("foodfy/chefs", { chefs })
  },
  search(req, res) {
    let { filter, page, limit } = req.query
    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          page,
          totalPages: Math.ceil(recipes[0].total / limit)
        }
        
        return res.render("foodfy/search", { recipes, filter, pagination })
      }
    }

    Recipe.paginate(params)
  }
}