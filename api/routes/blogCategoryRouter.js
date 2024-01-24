import express from 'express';
import { createCategory, deleteCategory, getCategory, getallCategory, updateCategory } from '../controllers/blogCategory.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const blogCategoryRouter = express.Router();

blogCategoryRouter.post("/",authMiddleware,isAdmin,createCategory);
blogCategoryRouter.put("/:id",authMiddleware,isAdmin,updateCategory);
blogCategoryRouter.delete("/:id",authMiddleware,isAdmin,deleteCategory);
blogCategoryRouter.get("/:id",getCategory);
blogCategoryRouter.get("/",getallCategory);

export default blogCategoryRouter;