const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('../utils/config');
// conifigure cloud storage using cloudinary storage engine
cloudinary.config({
    api_key: config.CLOUDINARY_API_KEY,
    cloud_name: config.CLOUD_NAME,
    api_secret: config.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        resource_type: 'raw'
    },
});

module.exports = storage;