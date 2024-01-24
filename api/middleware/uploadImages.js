import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({    // multer.diskStorage() creates a storage space for storing files. It takes an object with the destination and filename as properties
    destination: function (req, file, cb) {    // cb is callback
        cb(null, path.join(__dirname, "../public/images/"));   // save the image in this path
        //fs.unlinkSync(`public/images/`);   // delete the file from the local storage this function is not allowed in windows check it out
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    },
    });

    const multerFilter = (req, file, cb) => {   //here in this function we are checking the file type
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format" }, false);
    }
};

    const uploadPhoto = multer({     // multer() is a middleware which is used to upload files
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 },   
    });

    const productImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
        req.files.map(async (file) => {
        await sharp(file.path)
            .resize(300, 300)  // 300px x 300px
            .toFormat("jpeg")
            .jpeg({ quality: 90 })    // 90% quality
            .toFile(`public/images/products/${file.filename}`);  // save the image in this path   //resized image will be saved in this path
        //fs.unlinkSync(`public/images/products/${file.filename}`);    
    })
    );
    next();
};

    const blogImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
        req.files.map(async (file) => {
        await sharp(file.path)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/images/blogs/${file.filename}`);  //resized image will be saved in this path
        //fs.unlinkSync(`public/images/blogs/${file.filename}`);   // delete the file from the local storage
    })
    );
    next();
};

export { uploadPhoto, productImgResize, blogImgResize };

//TODO: after images are being uploaded to cloudinary then the images from the local storage doesn't get deleted check it out