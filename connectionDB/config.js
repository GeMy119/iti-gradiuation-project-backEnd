// const { v2 } = require("cloudinary")
// module.exports = {
//     cloudinary.: {
//     cloudName: 'dbtjqd95c',
//         apiKey: '932839352378323',
//             apiSecret: '218y-MQn4-SNhsoIRcGP2wtR5lI',
//     }
// }

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dbtjqd95c',
    api_key: '932839352378323',
    api_secret: '218y-MQn4-SNhsoIRcGP2wtR5lI'
});

const cloud=cloudinary.uploader.upload

module.exports=cloud