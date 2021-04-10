const Chef = require("../models/Chef")

module.exports = {
  index(req, res) {
    Chef.all((chefs) => {
      return res.render("admin/chefs/index", { chefs })
    })
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
  show(req, res) {
    Chef.findChef(req.params.id, (chef) => {
      Chef.recipesChef(req.params.id, (recipes) => {
        return res.render(`admin/chefs/chef`, { chef, recipes })
      })
    })
  },
  edit(req, res) {
    Chef.findChef(req.params.id, (chef) => {

      return res.render(`admin/chefs/edit`, { chef })
    })
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

