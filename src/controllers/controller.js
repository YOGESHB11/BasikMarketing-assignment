const util = require("../util/aws")
const cdn = require('../util/cloudfront')
const distribution_domain = 'https://db7dyg412q1xf.cloudfront.net'

const uploadData = async function(req,res){
    try{
        const {directoryPath} = req.body
        console.log(directoryPath)
        if(!directoryPath) return res.status(400).send({status : false, message : "Please provide directory path"})
        const file = req.files
        if(file && file.length > 0){
            const url = await util.uploadFile(file[0],directoryPath)
            console.log(url)
             let distPath= distribution_domain + '/' + directoryPath + '/' + file[0].originalname
            console.log(distPath)
            return res.status(200).send({status : true ,message : "CDN Entry successfully created" , s3_Bucket_Link : url , CDN_distribution_link : distPath})
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
        console.log(directoryPath)
        const file = req.files
        if(file && file.length > 0){
            const url = await util.uploadFile(file[0],directoryPath)
            console.log(url)
            const invalidCache = await cdn.invalidate(directoryPath)
            const path = distribution_domain + '/' + directoryPath + '/' + file[0].originalname
            return res.status(200).send({status : true ,message : "File successfully updated" , CDN_distribution_link : path})
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