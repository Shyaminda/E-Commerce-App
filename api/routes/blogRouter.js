import express from 'express';
import { createBlog, deleteBlog, disLikeTheBlog, getAllBlogs, getBlog, likeTheBlog, updateBlog, uploadImages } from '../controllers/blog.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
import { blogImgResize, uploadPhoto } from '../middleware/uploadImages.js';

const blogRouter = express.Router();

blogRouter.post("/",authMiddleware,isAdmin,createBlog);
blogRouter.put('/upload-images/:id',authMiddleware,isAdmin,uploadPhoto.array('images', 10),blogImgResize,uploadImages);  //here determines number of images to be uploaded to blog
blogRouter.put("/likes",authMiddleware,isAdmin,likeTheBlog);
blogRouter.put("/dislikes",authMiddleware,isAdmin,disLikeTheBlog);
blogRouter.put("/:id",authMiddleware,isAdmin,updateBlog);   //this passing /:id is taken in updateBlog function as req.params.id
blogRouter.get("/:id",getBlog);
blogRouter.get("/",getAllBlogs);
blogRouter.delete("/:id",authMiddleware,isAdmin,deleteBlog);


export default blogRouter;

//TODO: figure out why two image url arrays are being created in the database just create a new user and a product and check