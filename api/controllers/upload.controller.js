import asyncHandler from 'express-async-handler';
import { cloudinaryUploadImg,cloudinaryDeleteImg } from '../utils/cloudinary.js ';
import fs from 'fs';

const uploadImages = asyncHandler(async (req, res) => {
    // const { id } = req.params;        //changes made in second tutorial
    // validateMdbId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, 'images');    // 'images' is the folder name in cloudinary and path is the path of the image
        const urls = [];    // array to store the image urls
        const files = req.files;    // get the files from the req.files object through the middleware  //through the middleware we can get the files from the client side

        for(const file of files){   // loop through the files
            const { path } = file;   // get the path of the file
            const newPath = await uploader(path);   // upload the file to cloudinary
            //console.log(newPath);
            urls.push(newPath);   // push the new path to the urls array
            //fs.unlinkSync(path);    // delete the file from the local storage  //commented because the windows doesn't allow vscode to delete files through code
        }
        // const findProduct = await Product.findByIdAndUpdate(id,{       // find the product by id
        //     image: urls.map((file) => {return file}),   // update the images array with the new urls //here image field name should be as same as in the product model
        // },{ new: true });
        // res.json(findProduct);   //changes made in second tutorial

        const images = urls.map((file) => {
            return file
        });
        res.json(images);      //changes made in second tutorial

    } catch (error) {
        throw new Error(error, 'Product image uploading failed(uploadImages product.controller.js)');
    }
});

const deleteImages = asyncHandler(async (req, res) => {    //http://localhost:3000/api/product/delete-image/puedw5yobsv3ykmx8p82 in postman
    const { id } = req.params;   // get the product id from the req.params
    try {
        const deleted = await cloudinaryDeleteImg(id,"images");   // 'images' is the folder name in cloudinary and path is the path of the image  // delete the image from cloudinary
        res.json({message:"Image deleted successfully"});
    } catch (error) {
        throw new Error(error, 'Product image deleting failed(deleteImages product.controller.js)');
    }
});

export {uploadImages,deleteImages};