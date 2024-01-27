import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import validateMdbId from '../utils/validateMdbId.js';
import {cloudinaryUploadImg} from '../utils/cloudinary.js';
import fs from 'fs';

const createBlog = asyncHandler(async (req,res)=>{
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            newBlog
        });
    } catch (error) {
        throw new Error(error,"Error creating blog (blog.controller.js createBlog)");
    }
});

const updateBlog = asyncHandler(async (req, res) => {     //http://localhost:3000/api/blog/65b02a6843fafef38d3ec614 in postman
    const { id } = req.params;
    validateMdbId(id);  //validating mongodb id
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true,});
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error,"Error updating blog (blog.controller.js updateBlog)");
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMdbId(id);  //validating mongodb id
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("disLikes");
        await Blog.findByIdAndUpdate(id,{
            $inc: {numViews: 1},   //incrementing numViews by 1
        },{new: true});   //new:true returns the updated document

        res.json(getBlog);
    } catch (error) {
        throw new Error(error,"Error getting blog (blog.controller.js getBlog)");
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {    //http://localhost:3000/api/blog/ in postman
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    } catch (error) {
        throw new Error(error,"Error getting all blogs (blog.controller.js getAllBlogs)");
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMdbId(id);  //validating mongodb id
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error,"Error deleting blog (blog.controller.js deleteBlog)");
    }
});

const likeTheBlog = asyncHandler(async (req, res) => {         //http://localhost:3000/api/blog/likes/
    const {blogId} = req.body;  //blogId is the id of the blog which you want to like
    validateMdbId(blogId);  //validating mongodb id

    //find the blog which you want to like
    const blog = await Blog.findById(blogId);

    //check if the user is logged in or not
    const loginUserId = req?.user?._id;  //if user is logged in then req.user._id else undefined the main key thing here is _id

    //check if the user has already liked the blog 
    const isLiked = blog?.isLiked;  

    //check if the user has already disliked the blog
    const alreadyDisliked = blog?.disLikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()   
    );
    if(alreadyDisliked) {    //if the user has already disliked the blog then remove the dislike
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {dislikes: loginUserId},
            isDisliked: false,  //setting isDisliked to false
        },{new: true});
        res.json(blog);
    }
    if(isLiked) {       //if the user has already liked the blog then unlike it
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {likes: loginUserId},
            isLiked: false,     //setting isLiked to false
        },{new: true});
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId,{     //if the user has not liked the blog then like it
            $push: {likes: loginUserId},
            isLiked: true,
        },{new: true});
        res.json(blog);
    }
});

const disLikeTheBlog = asyncHandler(async (req, res) => {     //http://localhost:3000/api/blog/dislikes/ in postman
    const {blogId} = req.body;  //blogId is the id of the blog which you want to like
    validateMdbId(blogId);  //validating mongodb id

    //find the blog which you want to like
    const blog = await Blog.findById(blogId);

    //check if the user is logged in or not
    const loginUserId = req?.user?._id;  //if user is logged in then req.user._id else undefined the main key thing here is _id

    //check if the user has already disliked the blog 
    const isDisLiked = blog?.isDisLiked;      //isDisliked is a boolean value watchout in the db

    //check if the user has already disliked the blog
    const alreadyLiked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()   
    );
    if(alreadyLiked) {    //if the user has already disliked the blog then remove the dislike
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {likes: loginUserId},
            isLiked: false,  //setting isDisliked to false
        },{new: true});
        res.json(blog);
    }
    if(isDisLiked) {       //if the user has already disliked the blog then unlike it
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {disLikes: loginUserId},
            isDisLiked: false,     //setting isLiked to false
        },{new: true});
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId,{     //if the user has not liked the blog then like it
            $push: {disLikes: loginUserId},
            isDisLiked: true,
        },{new: true});
        res.json(blog);
    }
});

const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMdbId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, 'images');    // 'images' is the folder name in cloudinary and path is the path of the image
        const urls = [];    // array to store the image urls
        const files = req.files;    // get the files from the req.files object through the middleware  //through the middleware we can get the files from the client side

        for(const file of files){   // loop through the files
            const { path } = file;   // get the path of the file
            const newPath = await uploader(path);   // upload the file to cloudinary
            //console.log(newPath);
            urls.push(newPath);   // push the new path to the urls array
            //fs.unlinkSync(path);    // delete the file from the local storage   //commented because the windows doesn't allow vscode to delete files through code
        }
        const findBlog = await Blog.findByIdAndUpdate(id,{       // find the product by id
            image: urls.map((file) => {return file}),   // update the images array with the new urls //here image field name should be as same as in the product model
        },{ new: true });
        res.json(findBlog);  

    } catch (error) {
        throw new Error(error, 'Product image uploading failed(uploadImages product.controller.js)');
    }
});    //rather than referring this uploadImages function refer the uploadImages function in product.controller.js where the same code is copy pasted 

export {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,likeTheBlog,disLikeTheBlog,uploadImages};