import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import validateMdbId from '../utils/validateMdbId.js';

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

export {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,likeTheBlog,disLikeTheBlog};