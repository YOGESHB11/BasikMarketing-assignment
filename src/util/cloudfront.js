// const cloudFront = require('@aws-sdk/client-cloudfront')
// const dotenv = require('dotenv')
// dotenv.config()

// const bucketRegion = process.env.BUCKET_REGION
// const accessKey = process.env.ACCESS_KEY
// const secretAccessKey = process.env.SECRET_ACCESS_KEY


// const cloudfrontConfig = new cloudFront.CloudFrontClient({
//     credentials: {
//         accessKeyId: accessKey,
//         secretAccessKey: secretAccessKey,
//         region : bucketRegion
//     }
// })
const aws = require('aws-sdk')
// const {CLoudFrontClient, CreateInvalidationCommand} = require('@aws-sdk/client-cloudfront')
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

const invalidate = async function(directoryPath){
    const cloudfront = new aws.CloudFront();
    const invalidationParam = {
        DistributionId: 'E3RIAX7HDM2V68',
        InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
                Quantity: 1,
                Items: [ `/${directoryPath}`]
            }
        }
    }
    // const invalidation = await cloudfront.createInvalidation({
    //     DistributionId: 'E3RIAX7HDM2V68',
    //     InvalidationBatch: {
    //         CallerReference: Date.now().toString(),
    //         Paths: {
    //             Quantity: 1,
    //             Items: [`/${directoryPath}/*`]
    //         }
    //     }
    // }).promise();
    const invalidation = await cloudfront.createInvalidation(invalidationParam, function(err,data){
        if(err) console.log(err)
        else console.log(data)
    })
    // console.log(invalidation)

}

// const invalidation = async function (directoryPath) {
//     //Invalidating the cloud front cache for that data
//     const invalidationParams = {
//         DistributionId: distributionId,
//         InvalidationBatch: {
//             CallerReference: Date.now(),
//             Paths: {
//                 Quantity: 1,
//                 Items: [`/${directoryPath}/*`]
//             }
//         }
//     }
//     const invalidationCommand = new cloudFront.CreateInvalidationCommand(invalidationParams)
//     const xyz = await cloudfrontConfig.send(invalidationCommand)
//     console.log(xyz)
//     return xyz
// }

module.exports = {invalidate}