const util = require("../util/aws")
const cdn = require('../util/cloudfront')

const uploadData = async function(req,res){
    try{
        const file = req.files
        if(file && file.length > 0){
            const url = await util.uploadFile(file[0])
            console.log(url)
            return res.status(200).send({status : true , data : url})
        }else{
            return res.status(400).send({status : false , message : 'no file found'})
        }
    }catch(error){
        return res.status(500).send({status : false , msg : error.message})
    }
}

const deleteData = async function(req,res){
    try{
        const {directoryPath} = req.body
        if(!directoryPath) return res.status(400).send({status : false, message : "Please provide directory path of file "})
        const result = await util.deleteFile(directoryPath)
        const invalidCache = await cdn.invalidate(directoryPath)
        return res.status(200).send({status : result ,msg : "data deleted successfully" , invalidCache})
    }catch(error){
        return res.status(500).send({status : false , msg : error.message})
    }
}

module.exports = {uploadData , deleteData}