const express = require('express')
const nunjucks = require("nunjucks")
const routes = require("./routes")

const server = express()

server.use(express.urlencoded({ extended: true })) //Config. express pro req.body funcionar
server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server
})

server.listen(5000, () => {
  console.log("Server is running")
})