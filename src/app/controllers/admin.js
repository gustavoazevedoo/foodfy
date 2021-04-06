const db = require("../../config/db")

module.exports = {
  index(req, res) {
    return
  },
  create(req, res) {
    return res.render("admin/create")
  },
  post(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
  
    const { image, title, author, ingredients, steps, information } = req.body
    
    return
  },
  show(req, res) {
    return
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
  },
  delete(req, res) {
    return
  }

}