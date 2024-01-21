import express from 'express';
import { createProduct, getAllProducts, getProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/',createProduct);
productRouter.get('/:id',getProduct);
productRouter.get('/',getAllProducts);

export default productRouter;