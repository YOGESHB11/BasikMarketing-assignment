const express = require('express')
const route = express.Router()
const upload = require('../controllers/upload')
route.get("/test-me", function(req,res){
    res.send("running")
})

route.post("/upload",upload.uploadData)

route.delete("/delete", upload.deleteData)

module.exports = route