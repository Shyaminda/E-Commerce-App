import express from 'express';
import { addToWishList, createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/authMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/',authMiddleware,isAdmin,createProduct);
productRouter.get('/:id',getProduct);
productRouter.put('/wishList',authMiddleware,addToWishList);    
productRouter.put('/:id',authMiddleware,isAdmin,updateProduct);
productRouter.delete('/:id',authMiddleware,isAdmin,deleteProduct);
productRouter.get('/',getAllProducts);

export default productRouter;