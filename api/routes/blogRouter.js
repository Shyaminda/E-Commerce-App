import express from 'express';
import { createBlog, deleteBlog, disLikeTheBlog, getAllBlogs, getBlog, likeTheBlog, updateBlog } from '../controllers/blog.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const blogRouter = express.Router();

blogRouter.post("/",authMiddleware,isAdmin,createBlog);
blogRouter.put("/likes",authMiddleware,isAdmin,likeTheBlog);
blogRouter.put("/dislikes",authMiddleware,isAdmin,disLikeTheBlog);
blogRouter.put("/:id",authMiddleware,isAdmin,updateBlog);   //this passing /:id is taken in updateBlog function as req.params.id
blogRouter.get("/:id",getBlog);
blogRouter.get("/",getAllBlogs);
blogRouter.delete("/:id",authMiddleware,isAdmin,deleteBlog);


export default blogRouter;