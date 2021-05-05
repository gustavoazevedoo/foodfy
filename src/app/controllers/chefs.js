const { findChef } = require("../models/Chef")
const Chef = require("../models/Chef")

module.exports = {
  async index(req, res) {
    const results = await Chef.all()
    const chefs = results.rows
    
    return res.render("admin/chefs/index", { chefs })
  },
  create(req, res) {
    return res.render("admin/chefs/create")
  },
  post(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
  
    Chef.createChef(req.body, (chef) => {
      return res.redirect(`chefs/${chef.id}`)
    })
   
  },
  async show(req, res) {
    let results = await Chef.findChef(req.params.id)
    const chef = results.rows[0]

    results = await Chef.recipesChef(req.params.id)
    const recipes = results.rows

    return res.render(`admin/chefs/chef`, { chef, recipes })
  },
  async edit(req, res) {
    const results = await Chef.findChef(req.params.id)
    const chef = results.rows[0]

    return res.render(`admin/chefs/edit`, { chef })
  },
  put(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    Chef.update(req.body, () => {
      return res.redirect(`chefs/${req.body.id}`)
    })
  },
  delete(req, res) {
    Chef.findChef(req.body.id, (chef) => {
      if (chef.total_recipes > 0) {
        return res.send("Chef com receitas cadastradas não podem ser excluidos")
      } else {
        Chef.deleteChef(req.body.id, () => {
          return res.redirect("chefs")
        })
      }
    })
  }
}

