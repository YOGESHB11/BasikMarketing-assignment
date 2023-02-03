const express = require('express')
const app = express()
const multer = require('multer')
const route = require('./routes/route')

app.use(express.json())

app.use(multer().any())

app.use("/",route)

app.use("/*", function (req, res) {
    return res.status(400).send({status: false,message: "Please Enter Valid Path Or Parameters !!!!",});
  });
  
app.listen(3000 , function(){
    console.log("Express is running on port 3000")
})