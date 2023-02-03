const util = require("../util/aws")
const cdn = require('../util/cloudfront')
const dotenv = require('dotenv')
dotenv.config()

const uploadData = async function(req,res){
    try{
        const file = req.files
        if(file && file.length > 0){
            const url = await util.uploadFile(file[0])
            console.log(url)
            return res.status(200).send({status : true ,message : "Data has been successfully uploaded" , s3_Bucket_Link : url})
        }else{
            return res.status(400).send({status : false , message : 'Please upload a file'})
        }
    }catch(error){
        return res.status(500).send({status : false , msg : error.message})
    }
}

const update = async function(req,res){
    try{
        const {directoryPath} = req.body
        if(!directoryPath) return res.status(400).send({status : false, message : "Please provide directory path of file "})
        const file = req.files
        if(file && file.length > 0){
            const url = await util.uploadFile(file[0])
            console.log(url)
            const invalidCache = await cdn.invalidate(directoryPath)
            const distributionLink = process.env.DISTRIBUTION_DOMAIIN + directoryPath
            return res.status(200).send({status : true ,message : "FIle successfully uploaded", CDN_Distribution_link : distributionLink})
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

module.exports = {uploadData ,update , deleteData}