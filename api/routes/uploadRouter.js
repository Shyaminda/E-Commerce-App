import express from 'express';
import { deleteImages,uploadImages } from '../controllers/upload.controller.js';
import { isAdmin } from '../middleware/authMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { productImgResize, uploadPhoto } from '../middleware/uploadImages.js';

const uploadRouter = express.Router();

uploadRouter.post('/',authMiddleware,isAdmin,uploadPhoto.array('images', 10),productImgResize,uploadImages);     //here determines number of images to be uploaded to product
uploadRouter.delete('/delete-image/:id',authMiddleware,isAdmin,deleteImages);

export default uploadRouter;


//TODO: figure out why two image url arrays are being created in the database just create a new user and a product and check