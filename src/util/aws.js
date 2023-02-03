const aws = require('aws-sdk')
// const {CLoudFrontClient, CreateInvalidationCommand} = require('@aws-sdk/client-cloudfront')
const dotenv = require('dotenv')
dotenv.config()

const bucketName = process.env.BUCKET_NAME 
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

aws.config.update({
    accessKeyId : accessKey,
    secretAccessKey : secretAccessKey,
    region : bucketRegion
})

const uploadFile = function(file,path){
    return new Promise(function(resolve,reject){
        
        let s3 = new aws.S3({"apiVersion" : "2006-03-01"})
        // console.log(file.mimetype)
        const uploadParams = {
            ACL : "public-read",
            Bucket : bucketName,
            Key : `${path}/`+file.originalname,
            Body : file.buffer,
        }

        s3.upload(uploadParams, function(err,result){
            if(err) {
                // console.log(err)
                return reject({error : err})
            }
            return resolve(result.Location)
        })
    })
}

const deleteFile = function(directoryPath){
    return new Promise((resolve,reject) => {
        let s3 = new aws.S3({"apiVersion" : "2006-03-01"})
        const params = {
            Bucket : bucketName,
            Key : directoryPath
        }

        s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log(err)
                return reject({error : err})
                
            }
            else{
                console.log("Successfully deleted file from bucket");
                return resolve(true)
                // return res.status(200).send({msg : "Data deleted successfully"})
            }
               
        });
    })
}

module.exports = {uploadFile , deleteFile}