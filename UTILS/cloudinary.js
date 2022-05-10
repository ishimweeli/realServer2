import { uploader } from 'cloudinary';

import { v2 as cloudinary } from 'cloudinary';

uploader.upload("my_image.jpg", function (error, result) { console.log(result, error) });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    // secure: true
});

export default cloudinary;