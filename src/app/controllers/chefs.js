const Chef = require("../models/Chef")

module.exports = {
  index(req, res) {
    Chef.all((chefs) => {
      return res.render("chefs/index", { chefs })
    })
  },
  create(req, res) {
    return res.render("chefs/create")
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

      return res.render(`chefs/chef`, { chef })
    })
  },
  edit(req, res) {
    Chef.findChef(req.params.id, (chef) => {

      return res.render(`chefs/edit`, { chef })
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
    Chef.deleteChef(req.body.id, () => {
      return res.redirect("/chefs")
    })
  }

}