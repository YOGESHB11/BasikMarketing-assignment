const aws = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()

const bucketName = process.env.BUCKET_NAME 
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const distributionId = process.env.DISRIBUTION_ID

aws.config.update({
    accessKeyId : accessKey,
    secretAccessKey : secretAccessKey,
    region : bucketRegion
})

//Invalidating data in cache which has been changed in S3 bucket
const invalidate = async function(directoryPath){
    const cloudfront = new aws.CloudFront();
    const invalidationParam = {
        DistributionId: 'E16BO0CEZW1N5N',
        InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
                Quantity: 1,
                Items: [ `/${directoryPath}`]
            }
        }
    }
    const invalidation = await cloudfront.createInvalidation(invalidationParam, function(err,data){
        if(err) console.log(err)
        else {
            console.log(data)
        }
    })
}

module.exports = {invalidate}