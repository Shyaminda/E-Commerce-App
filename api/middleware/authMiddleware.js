import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;     //here we declare a variable token
    if(req?.headers?.authorization?.startsWith("Bearer")){     //here we check if the authorization header starts with the word Bearer
        token = req.headers.authorization.split(" ")[1];    //here we split the token from the authorization header
        try {
            if(token){    //here we check if the token exists
                const decoded = jwt.verify(token,process.env.JWT_SECRET);    //here we verify the token    //the jwt token is generated in the token.js
                const user = await User.findById(decoded.id);    //here we get the user from the database
                req.user = user;    //here we assign the user to the req object
                next();
            }
        } catch (error) {
            throw new Error(error,"Not authorized, token failed login again");
        }
    } else {
        throw new Error("Not authorized, no token");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;  //here we get the email from the req.user object because we have assigned the user to the req object in the authMiddleware
    const adminUser = await User.findOne({email: email});    //here we get the user from the database
    if(adminUser.role !== "admin"){
        throw new Error("your not an admin");
    } else {
        next();
    }
});

export {authMiddleware,isAdmin};