import generateToken from '../config/token.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import validateMdbId from '../utils/validateMdbId.js';
import generateRefreshToken from '../config/refreshToken.js';
import jwt from 'jsonwebtoken';

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
        
        const refreshToken = await generateRefreshToken(findUser?._id);    //here we generate the refresh token
        const updateUser = await User.findByIdAndUpdate(findUser?._id,{refreshToken: refreshToken},{new: true});    //here we update the refresh token in the database
        res.cookie("refreshToken",refreshToken,{     //here we set the refresh token in the cookie
            httpOnly: true,
            maxAge:72*60*60*1000
        });

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

// const handleRefreshToken = asyncHandler(async (req, res) => {    //here we handle the refresh token
//     const cookie = req.cookies;    //here we get the cookie from the req object
//     if(!cookie?.refreshToken){throw new Error('No refresh token');}    //here we check if the cookie exists
//     const refreshToken = cookie.refreshToken;    //here we get the refresh token from the cookie
//     const user = await User.findOne({refreshToken: refreshToken});    //here we get the user from the database with the refresh token
//     if(!user){throw new Error('No user found');}    //here we check if the user exists
//     jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded) => {     //here we verify the refresh token
//         if(err || user._id !== decoded.id)      //here we check if the refresh token is valid
//         {
//             throw new Error('Invalid refresh token');
//         } else {
//             const newToken = generateToken(user?._id);    //If the refresh token is valid, generates a new token (usually an access token) using the generateToken function.   //here we generate a new token    //in the tutorial accessToken is used instead of newToken
//             res.json({token: newToken});    //here we send the new token to the client
//         }
//     });   
// })    
//same code above and below
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    // Check if the refresh token exists in the cookie
    if (!cookie?.refreshToken) {
        throw new Error('No refresh token');
    }

    // Get the refresh token from the cookie
    const refreshToken = cookie.refreshToken;

    // Get the user from the database using the refresh token
    const user = await User.findOne({ refreshToken: refreshToken });

    // Check if the user exists
    if (!user) {
        throw new Error('No user found');
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        // Check if there's an error or if the decoded user ID doesn't match the database user ID
        if (err || user._id !== decoded.id) {
            throw new Error('Invalid refresh token(handlerRefreshToken user.controller.js)');
        } else {
            // Generate a new token (access token)
            const newToken = generateToken(user?._id);

            // Send the new token to the client
            res.json({ token: newToken });
        }
    });
});

const updateAUser = asyncHandler(async (req, res) => {     //here we update a single user by id
    const { id } = req.user;    //here we get the id from the url    //here we get the id from the req.user object because we have assigned the user to the req object in the authMiddleware
    validateMdbId(id);    //here we validate the id

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

// const logOut = asyncHandler(async (req, res) => {
//     const cookie = req.cookies;    //here we get the cookie from the req object
//     if(!cookie?.refreshToken){throw new Error('No refresh token');}    //here we check if the cookie exists
//     const refreshToken = cookie.refreshToken;    //here we get the refresh token from the cookie
//     const user = await User.findOne({refreshToken: refreshToken});    //here we get the user from the database with the refresh token
//     if(!user){   //here we check if the user exists
//         res.clearCookie("refreshToken",{     //here we clear the cookie
//             httpOnly: true,
//             secure: true,
//         });
//         return res.status(204);
//     }
//     await User.findByIdAndUpdate(refreshToken,{
//         refreshToken:""
//     });
//     res.clearCookie("refreshToken",{     //here we clear the cookie
//         httpOnly: true,
//         secure: true,
//     });
//     return res.status(204);
// });
//same code above and below
const logOut = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    // Check if the refresh token exists in the cookie
    if (!cookie?.refreshToken) {
        throw new Error('No refresh token');
    }

    // Get the refresh token from the cookie
    const refreshToken = cookie.refreshToken;

    // Get the user from the database using the refresh token
    const user = await User.findOne({ refreshToken: refreshToken });

    // Check if the user exists
    if (!user) {
        // If the user does not exist, clear the cookie and send a 204 (No Content) response
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.status(204).send();
    }

    // Update the user's document in the database to remove the refresh token
    await User.findByIdAndUpdate(user._id, {
        refreshToken: ""
    });

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    // Send a 204 (No Content) response
    res.status(204).send();
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
    validateMdbId(id);    //here we validate the id
    
    try {
        const getAUser = await User.findById(id);
        res.json(getAUser);
    } catch (error) {
        throw new Error(error,'Error while fetching a user(user.controller.js getAUser)');
    }
});

const deleteAUser = asyncHandler(async (req, res) => {    //here we get a single user by id and delete it
    const { id } = req.params;    //here we get the id from the url
    validateMdbId(id);    //here we validate the id
    
    try {
        const deleteAUser = await User.findByIdAndDelete(id);
        res.json(getAUser);
    } catch (error) {
        throw new Error(error,'Error while deleting a user(user.controller.js deleteAUser)');
    }
});

const blockUser = asyncHandler(async (req, res) => {        //here we get a single user by id and block it
    const { id } = req.params;    //here we get the id from the url
    validateMdbId(id);    //here we validate the id

    try {
        const blockUser = await User.findByIdAndUpdate(id,{isBlocked: true},{new: true});
        res.json({message: "User blocked successfully"});
    } catch (error) {
        throw new Error(error,'Error while blocking the user(user.controller.js blockUser)');
    }
}); 


const unBlockUser = asyncHandler(async (req, res) => {        //here we get a single user by id and unblock it
    const { id } = req.params;    //here we get the id from the url
    validateMdbId(id);    //here we validate the id

    try {
        const unBlockUser = await User.findByIdAndUpdate(id,{isBlocked: false},{new: true});
        res.json({message: "User unblocked successfully"});
    } catch (error) {
        throw new Error(error,'Error while unblocking the user(user.controller.js unBlockUser)');
    }
}); 

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;    //here we get the id from the url    //here we get the id from the req.user object because we have assigned the user to the req object in the authMiddleware
    const password = req.body.password;
    validateMdbId(_id);    //here we validate the id

    const user = await User.findById(_id);    //here we get the user from the database
    if(password){
        user.password = password;    //here we update the password
        const updatedPassword = await user.save();    //here we save the updated password
        res.json(updatedPassword);
    } else {
        res.json(user);     //here we send the user
    }
});


export {createUser,login,getAllUsers,getAUser,deleteAUser,updateAUser,blockUser,unBlockUser,handleRefreshToken,logOut,updatePassword};