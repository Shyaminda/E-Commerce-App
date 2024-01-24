import express from 'express';
import { addToWishList, createProduct, deleteProduct, getAllProducts, getProduct, rating, updateProduct, uploadImages } from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/authMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { productImgResize, uploadPhoto } from '../middleware/uploadImages.js';

const productRouter = express.Router();

productRouter.post('/',authMiddleware,isAdmin,createProduct);
productRouter.put('/upload-images/:id',authMiddleware,isAdmin,uploadPhoto.array('images', 10),productImgResize,uploadImages);     //here determines number of images to be uploaded to product
productRouter.get('/:id',getProduct);
productRouter.put('/wishList',authMiddleware,addToWishList);    
productRouter.put('/ratings',authMiddleware,rating);    
productRouter.put('/:id',authMiddleware,isAdmin,updateProduct);
productRouter.delete('/:id',authMiddleware,isAdmin,deleteProduct);
productRouter.get('/',getAllProducts);

export default productRouter;


//TODO: figure out why two image url arrays are being created in the database just create a new user and a product and check