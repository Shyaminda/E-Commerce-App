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
        throw new Error('Invalid email or password');
    }
});

export {createUser,login};