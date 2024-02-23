import express from 'express';
import { addToWishList, createProduct, deleteProduct, getAllProducts, getProduct, rating, updateProduct } from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/authMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/',authMiddleware,isAdmin,createProduct);
productRouter.get('/:id',getProduct);
productRouter.put('/wishList',authMiddleware,addToWishList);    
productRouter.put('/ratings',authMiddleware,rating);    
productRouter.put('/:id',authMiddleware,isAdmin,updateProduct);
productRouter.delete('/:id',authMiddleware,isAdmin,deleteProduct);
productRouter.get('/',getAllProducts);

export default productRouter;


//TODO: figure out why two image url arrays are being created in the database just create a new user and a product and check