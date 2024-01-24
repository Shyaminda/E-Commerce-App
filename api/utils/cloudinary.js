import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
        resolve(
            {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
            },
            {
            resource_type: "auto",
            }
        );
        });
    });
};

export default cloudinaryUploadImg;