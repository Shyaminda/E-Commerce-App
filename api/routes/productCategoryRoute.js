import express from 'express';
import { createCategory, deleteCategory, getCategory, getallCategory, updateCategory } from '../controllers/productCategory.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const productCategoryRouter = express.Router();

productCategoryRouter.post("/",authMiddleware,isAdmin,createCategory);
productCategoryRouter.put("/:id",authMiddleware,isAdmin,updateCategory);
productCategoryRouter.delete("/:id",authMiddleware,isAdmin,deleteCategory);
productCategoryRouter.get("/:id",getCategory);
productCategoryRouter.get("/",getallCategory);

export default productCategoryRouter;