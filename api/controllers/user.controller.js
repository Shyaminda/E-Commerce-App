import generateToken from '../config/token.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const createUser = asyncHandler (async (req, res) => {        //here we use the asyncHandler middleware to handle asynchronous operations within the route handler. This middleware helps to avoid repetitive try-catch blocks for error handling.
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    if(!findUser){
    const newUser =await User.create(req.body);
    res.json(newUser);
    } else {
        throw new Error('User already exists');
    }
});

const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const findUser = await User.findOne({email: email});     //here check if user exist or not
    if(findUser && (await findUser.matchPassword(password))){     //here check if password is correct or not
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error('Invalid credentials');
    }
});

const updateAUser = asyncHandler(async (req, res) => {     //here we update a single user by id
    const { id } = req.user;    //here we get the id from the url    //here we get the id from the req.user object because we have assigned the user to the req object in the authMiddleware
    try {
        const updateUser = await User.findByIdAndUpdate(id,{
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            mobile: req?.body?.mobile,    
        },{new: true});
        res.json(updateUser);
    } catch (error) {
        throw new Error(error,'Error while updating a user(user.controller.js updateAUser)');
    }
});   

const getAllUsers = asyncHandler(async (req, res) => {   //here we get all users
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error,'Error while fetching users(user.controller.js getAllUsers)');
    }
});

const getAUser = asyncHandler(async (req, res) => {    //here we get a single user by id
    const { id } = req.params;    //here we get the id from the url
    
    try {
        const getAUser = await User.findById(id);
        res.json(getAUser);
    } catch (error) {
        throw new Error(error,'Error while fetching a user(user.controller.js getAUser)');
    }
});

const deleteAUser = asyncHandler(async (req, res) => {    //here we get a single user by id and delete it
    const { id } = req.params;    //here we get the id from the url
    
    try {
        const deleteAUser = await User.findByIdAndDelete(id);
        res.json(getAUser);
    } catch (error) {
        throw new Error(error,'Error while deleting a user(user.controller.js deleteAUser)');
    }
});

const blockUser = asyncHandler(async (req, res) => {        //here we get a single user by id and block it
    const { id } = req.params;    //here we get the id from the url
    try {
        const blockUser = await User.findByIdAndUpdate(id,{isBlocked: true},{new: true});
        res.json({message: "User blocked successfully"});
    } catch (error) {
        throw new Error(error,'Error while blocking the user(user.controller.js blockUser)');
    }
}); 


const unBlockUser = asyncHandler(async (req, res) => {        //here we get a single user by id and unblock it
    const { id } = req.params;    //here we get the id from the url
    try {
        const unBlockUser = await User.findByIdAndUpdate(id,{isBlocked: false},{new: true});
        res.json({message: "User unblocked successfully"});
    } catch (error) {
        throw new Error(error,'Error while unblocking the user(user.controller.js unBlockUser)');
    }
}); 


export {createUser,login,getAllUsers,getAUser,deleteAUser,updateAUser,blockUser,unBlockUser};