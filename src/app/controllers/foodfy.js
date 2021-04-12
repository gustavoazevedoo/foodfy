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
        
        return res.render("foodfy/recipes", { recipes, filter, pagination })
      }
    }

    Recipe.paginate(params)
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