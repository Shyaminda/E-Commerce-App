import generateToken from '../config/token.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import validateMdbId from '../utils/validateMdbId.js';
import generateRefreshToken from '../config/refreshToken.js';
import jwt from 'jsonwebtoken';
import {sendEmail} from '../controllers/email.controller.js';
import crypto from 'crypto';
import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Coupon from '../models/couponModel.js';
import uniqid from 'uniqid';
import { log } from 'console';

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

const adminLogin = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const findAdmin = await User.findOne({email: email});     //here check if user exist or not

    if(findAdmin.role !== "admin")throw new Error('not Authorized (user.controller.js adminLogin)');    //here we check if the user is admin or not

    if(findAdmin && (await findAdmin.matchPassword(password))){     //here check if password is correct or not
        
        const refreshToken = await generateRefreshToken(findAdmin?._id);    //here we generate the refresh token
        const updateUser = await User.findByIdAndUpdate(findAdmin?._id,{refreshToken: refreshToken},{new: true});    //here we update the refresh token in the database
        res.cookie("refreshToken",refreshToken,{     //here we set the refresh token in the cookie
            httpOnly: true,
            maxAge:72*60*60*1000
        });

        res.json({
            _id: findAdmin?._id,
            firstName: findAdmin?.firstName,
            lastName: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
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

const saveAddress = asyncHandler(async (req, res,next) => {
    const { _id } = req.user;    //here we get the id from the url    //here we get the id from the req.user object because we have assigned the user to the req object in the authMiddleware
    validateMdbId(_id);    //here we validate the id

    try {
        const updateAddress = await User.findByIdAndUpdate(_id,{
            address: req?.body?.address,    //here we update the address
        },{new: true});
        res.json(updateAddress);
    } catch (error) {
        throw new Error(error,'Error while updating a address(user.controller.js saveAddress)');
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

const forgotPasswordToken = asyncHandler(async (req, res) => {     //http://localhost:3000/api/user/forgot-password-token in postman
    const { email } = req.body;    //here we get the email from the req.body object
    const user = await User.findOne({email});    //here we get the user from the database
    if(!user)throw new Error('No user found');    //here we check if the user exists
    try {
        const token = await user.createPasswordResetToken();    //here we create the password reset token
        await user.save();
        const resetURL = `Follow the link to reset the password. Only valid for 10min <a href='http://localhost:3000/api/user/reset-password/${token}'>Click Here</>`;    //here we create the reset url
        const data = {
            to: email,
            subject: "Password Reset",
            text: "Forget Password Link",
            htm: resetURL,
        };
        sendEmail(data);    //here we send the email
        res.json(token);
    } catch (error) {
        throw new Error(error,'Error while sending the email(user.controller.js forgotPasswordToken)');
    }
});

const resetPassword = asyncHandler(async (req, res) => {     //http://localhost:3000/api/user/reset-password/4928841b0ae5268c5b8abbf33aa254333cc8dfbae44d13ea6aa69f8d1c41501b in postman
    const { password } = req.body;    //here we get the password from the req.body object
    const { token } = req.params;    //here we get the token from the url from http://localhost:3000/api/user/reset-password/${token}
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");    //here we hash the token
    const user = await User.findOne({
        passwordResetToken: hashedToken,    //here we check if the hashed token is equal to the passwordResetToken in the database
        passwordResetExpires: {    //here we check if the passwordResetExpires is greater than the current time
            $gt: Date.now(),   //this time can be change from user.model.js
        },
    });
    if(!user)throw new Error('Token is invalid or has expired');    //here we check if the user exists
    user.password = password;    //here we update the password
    user.passwordResetToken = undefined;    //here we update the passwordResetToken
    user.passwordResetExpires = undefined;    //here we update the passwordResetExpires
    await user.save();    //here we save the user
    res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {       //here we get the wishlist of a user
    const { _id } = req.user;   // get the user id from the req.user object
    try {
        const findUser = await User.findById(_id).populate("wishList")    //here we get the user from the database
        res.json(findUser);
    } catch (error) {
        throw new Error(error,'Error while getting the wishlist(user.controller.js getWishList)');
    }
});

const userCart = asyncHandler(async (req, res) => {
    console.log("userCart function is being executed");
    const { productId,color,quantity,price } = req.body;    //here we get the cart from the req.body object

    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(_id);    //here we validate the id
    try {
        
        const newCart = await new Cart({   //here we create a new cart
            userId: _id,
            productId,
            color,
            quantity,
            price,
        }).save();
        res.json(newCart);

        // {
        //     "orderBy": "65ac2c02f98f661518a0962a",
        //     "products": [
        //       {
        //         "product": "65ae3552f8182da30f81a87f",
        //         "quantity": 5,
        //         "color": "black",
        //         "price": 2000,
        //         "_id": "65b2d8b4a8d8dbfe9bf1af87"     //this is the id of the cart 
        //       },
        //       {
        //         "product": "65ae3546f8182da30f81a87b",
        //         "quantity": 6,
        //         "color": "red",
        //         "price": 3000,
        //         "_id": "65b2d8b4a8d8dbfe9bf1af88"   //this is the id of the cart 
        //       }
        //     ],
        //     "cartTotal": 28000,
        //     "_id": "65b2d8b4a8d8dbfe9bf1af86",
        //     "createdAt": "2024-01-25T21:55:00.988Z",
        //     "updatedAt": "2024-01-25T21:55:00.988Z",
        //     "__v": 0
        //   }  this is the output from the above code here 
        
    } catch (error) {
        throw new Error(error,'Error while getting the cart(user.controller.js userCart)');
    }

});

const getUserCart = asyncHandler(async (req, res) => {     //here we get the cart of a user
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(_id);    //here we validate the id

    try {
        const cart = await Cart.findOne({userId: _id}).populate("productId").populate("color");      //When you use .populate("products.product"), Mongoose will replace the product field in each products array element with the actual document from the "Product" collection    //here we get the cart from the database  //a cart will created to a user id   //here we populate the products field which is in the cartModel with the product model
        res.json(cart);
    } catch (error) {
        throw new Error(error,'Error while getting the cart(user.controller.js getUserCart)');
    }
});

const removeProductFromCart = asyncHandler(async (req, res) => {          //here we remove a product from the cart
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    const { cartItemId } = req.params;    //here we get the cartItemId from the req.body object  which is used in authService.removeProductFromCart(cartItemId) in the authSlice.js
    validateMdbId(_id);    //here we validate the id

    try{
        const deleteProductFromCart = await Cart.deleteOne({_id: cartItemId,userId:_id});    //here we delete the product from the cart
        res.json(deleteProductFromCart);
    } catch (error) {
        throw new Error(error,'Error while deleting the product from the cart(user.controller.js removeProductFromCart)');
    }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {          //here we update the product quantity from cart
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    const { cartItemId,newQuantity } = req.params;    //here we get the cartItemId and quantity from the req.body object
    validateMdbId(_id);    //here we validate the id

    try {
        const cartItem = await Cart.findOne({_id: cartItemId,userId:_id});    //here we update the product quantity from cart
        cartItem.quantity = newQuantity;    //here we update the quantity
        cartItem.save();    //here we save the cartItem
        res.json(cartItem);
    } catch (error) {
        throw new Error(error,'Error while updating the product quantity(user.controller.js updateProductQuantity)');
    }
});    

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(_id);    //here we validate the id

    try {
        const user = await User.findById({_id});    //here we get the user from the database
        const cart = await Cart.findOneAndDelete({orderBy: user._id});    //here we delete the cart from the database
        res.json(cart);
    } catch (error) {
        throw new Error(error,'Error while deleting the cart(user.controller.js emptyCart)');
    }
});

const applyCoupon = asyncHandler(async (req, res) => {    //http://localhost:3000/api/user/cart/apply-coupon in postman
    const { coupon } = req.body;    //here we get the coupon from the req.body object
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(_id);    //here we validate the id

    const validCoupon = await Coupon.findOne({name: coupon});    //here we get the coupon from the database
    if(!validCoupon)throw new Error('Invalid coupon');    //here we check if the coupon exists

    const user = await User.findById({_id});    //here we get the user from the database
    let {cartTotal} = await Cart.findOne({orderBy: user._id}).populate("products.product");      //When you use .populate("products.product"), Mongoose will replace the product field in each products array element with the actual document from the "Product" collection    //here we get the cart from the database   //here we populate the products field which is in the cartModel with the product model
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);    //here we calculate the totalAfterDiscount   
    await Cart.findOneAndUpdate({orderBy: user._id},{totalAfterDiscount: totalAfterDiscount},{new: true});    //here we update the totalAfterDiscount in the database
    res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD,couponApplied } = req.body;    //here we get the COD and couponApplied from the req.body object
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(_id);    //here we validate the id

    try {
        if(!COD)throw new Error('creating cash on delivery order failed');    //here we check if the COD is required
        const user = await User.findById({_id});    //here we get the user from the database
        
        const userCart = await Cart.findOne({orderBy: user._id});    //here we get the cart from the database   //here we populate the products field which is in the cartModel with the product model
        let finalAmount = 0;    //here we create a variable and assign 0 to it
        if(couponApplied && userCart.totalAfterDiscount){    //here we check if the couponApplied and userCart.totalAfterDiscount exists
            finalAmount = userCart.totalAfterDiscount;    //here we assign the userCart.totalAfterDiscount to the finalAmount
        } else {
            finalAmount = userCart.cartTotal;    //here we assign the userCart.cartTotal to the finalAmount   
        }

        const newOrder = await new Order({
            products: userCart.products,    //here we get the products from the userCart
            paymentIntent: {
                id: uniqid(),
                amount: finalAmount,
                currency: "usd",
                status: "Cash on Delivery",
                created: Date.now(),
                method: "COD",
            },
            orderBy: user._id,    //here we get the user id from the user
            orderStatus: "Cash on Delivery",
        }).save();
        
        const update = userCart.products.map((item) => {         //here we loop through the userCart.products
            return{
                updateOne: {
                    filter: { _id: item.product._id },    //here we get the product id from the userCart.products
                    update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },    //here we update the quantity and sold
                },
            }
        });
        const updated = await Product.bulkWrite(update, {});    //here we update the product quantity and sold in the database
        res.json("Order created successfully");

    } catch (error) {
        throw new Error(error,'Error while creating the order(user.controller.js createOrder)');
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(_id);    //here we validate the id

    try {
        const userOrders = await Order.find({orderBy: _id}).populate("products.product").exec();    //When you use .populate("products.product"), Mongoose will replace the product field in each products array element with the actual document from the "Product" collection   //here we get the orders from the database   //here we populate the products field which is in the orderModel with the product model 
        res.json(userOrders);
    } catch (error) {
        throw new Error(error,'Error while getting the orders(user.controller.js getOrders)');
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const allUserOrders = await Order.find().populate("products.product").populate("orderBy").exec();    //When you use .populate("products.product"), Mongoose will replace the product field in each products array element with the actual document from the "Product" collection   //here we get the orders from the database   //here we populate the products field which is in the orderModel with the product model 
        res.json(allUserOrders);
    } catch (error) {
        throw new Error(error,'Error while getting all orders(user.controller.js getAllOrders)');
    }
});

const getOrderByUser = asyncHandler(async (req, res) => {
    const { id } = req.params;    //here we get the id from the req.user object  without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter
    validateMdbId(id);    //here we validate the id

    try {
        const userOrdersById = await Order.findOne({orderBy: id}).populate("products.product");    //When you use .populate("products.product"), Mongoose will replace the product field in each products array element with the actual document from the "Product" collection   //here we get the orders from the database   //here we populate the products field which is in the orderModel with the product model 
        res.json(userOrdersById);
    } catch (error) {
        throw new Error(error,'Error while getting the order(user.controller.js getOrderByUser)');
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const {status} = req.body;    //here we get the status from the req.body object
    const { id } = req.params;    //here we get the id from the url
    validateMdbId(id);    //here we validate the id

    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(id,{
            orderStatus: status,
            paymentIntent: {
                status: status,        ////this is a payment gateway status
            },
        },{new: true});
        res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error,'Error while updating the order status(user.controller.js updateOrderStatus)');
    }
});

export {
    createUser,
    login,
    getAllUsers,
    getAUser,
    deleteAUser,
    updateAUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logOut,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    adminLogin,
    getWishList,
    saveAddress,
    userCart,
    getUserCart,
    removeProductFromCart,
    updateProductQuantityFromCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
    getAllOrders,
    getOrderByUser,
};



//**the code below is from userCart function 
// let products = [];    //here we create an empty array
//         const user = await User.findById(_id);    //here we get the user from the database
        
//         // const alreadyExistCart = await Cart.findOne({orderBy: user._id});    //here we check if the cart already exists   //the login user id will be taken from here
//         // if(alreadyExistCart){    //here we check if the cart already exists
//         //     alreadyExistCart.remove();    //here we remove the cart because we are going to update the cart
//         // }
//         for(let i=0;i<cart.length;i++){    //here we loop through the cart
//             const product = {};    //here we create an empty object
//             product.product = cart[i]._id;    //here we get the product id from the cart   //here cart[i] means the first item in the array   //_id is passed from cartModel in product field which has the link to product db
//             product.quantity = cart[i].quantity;    //here we get the quantity from the cart
//             product.color = cart[i].color;    //here we get the color from the cart
            
//             const getPrice = await Product.findById(cart[i]._id).select("price").exec();   //here we get the price from the database and we use exec() to execute the query
//             product.price = getPrice.price;    //here we need to store the price in the product object because we need the price in the order model
//             products.push(product);    //here we push the product object to the products array because we need to store the products in the order model
//         }
//         //console.log(products);   //to get this console log a product items must have a price given (ex-2000) then only this will execute anyway update the price of the product in the database
//         let cartTotal = 0;    //here we create a variable and assign 0 to it
//         for(let i=0;i<products.length;i++){    //here we loop through the products
//             cartTotal = cartTotal + products[i].price * products[i].quantity;    //here we calculate the cartTotal   //here products[i] means the first item in the array
//         }
//         //console.log(cartTotal,products);    //to get this console log a product items must have a price given (ex-2000) then only this will execute