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
})

export default createUser;