import express from 'express';
import {adminLogin, blockUser, createOrder, createUser,deleteAUser,forgotPasswordToken,getAUser,getAllUsers,getUserCart,getWishList,handleRefreshToken,logOut,login, removeProductFromCart, resetPassword, saveAddress, unBlockUser, updateAUser, updatePassword, updateProductQuantityFromCart, userCart} from '../controllers/user.controller.js';
import {authMiddleware,isAdmin} from '../middleware/authMiddleware.js';
import { checkOut, paymentVerification } from '../controllers/payment.controller.js';

const authRouter = express.Router();
                                                //order of the routes matter
authRouter.post('/register',createUser);
authRouter.post("/forgot-password-token",forgotPasswordToken);
authRouter.put("/reset-password/:token",resetPassword);
//authRouter.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus);

authRouter.put("/update-password",authMiddleware,updatePassword);
authRouter.post('/login',login);
authRouter.post('/admin-login',adminLogin);
authRouter.post('/cart',authMiddleware,userCart);
authRouter.post('/order/checkout',authMiddleware,checkOut);
authRouter.post('/order/paymentVerification',authMiddleware,paymentVerification);
//authRouter.post('/cart/apply-coupon',authMiddleware,applyCoupon);
authRouter.post('/cart/create-order',authMiddleware,createOrder);
authRouter.get('/all-users',getAllUsers);
//authRouter.get('/get-order',authMiddleware,getOrders);
//authRouter.get('/getallorders',authMiddleware,isAdmin,getAllOrders);
//authRouter.get('/getOrderByUser/:id',authMiddleware,isAdmin,getOrderByUser);
authRouter.get('/refresh',handleRefreshToken);  //here we get the refresh token,the place where the handleRefreshToken placed is important
authRouter.get('/logout',logOut);
authRouter.get('/wishlist',authMiddleware,getWishList);
authRouter.get('/cart',authMiddleware,getUserCart);

authRouter.get('/:id',authMiddleware,isAdmin,getAUser);
//authRouter.delete('/empty-cart',authMiddleware,emptyCart);
authRouter.delete('/delete-product-cart/:cartItemId',authMiddleware,removeProductFromCart);
authRouter.put('/update-product-cart/:cartItemId/:newQuantity',authMiddleware,updateProductQuantityFromCart);
authRouter.delete('/:id',deleteAUser);

authRouter.put('/edit-user',authMiddleware,updateAUser);
authRouter.put('/save-address',authMiddleware,saveAddress);
authRouter.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
authRouter.put('/unBlock-user/:id',authMiddleware,isAdmin,unBlockUser);      //unBlock-user/:id the id we need to block



export default authRouter;

//without authMiddleWare we can't get the id from the req.user object this should be after the authMiddleWare in the authRouter