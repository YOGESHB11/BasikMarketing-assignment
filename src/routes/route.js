const express = require('express')
const route = express.Router()
const controller = require('../controllers/controller')
route.get("/test-me", function(req,res){
    res.send("running")
})

route.post("/create",controller.uploadData)

route.post("/update" , controller.update)

route.delete("/delete", controller.deleteData)

module.exports = route