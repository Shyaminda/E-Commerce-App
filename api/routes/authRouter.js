import express from 'express';
import {adminLogin, blockUser, createUser,deleteAUser,forgotPasswordToken,getAUser,getAllUsers,getWishList,handleRefreshToken,logOut,login, resetPassword, saveAddress, unBlockUser, updateAUser, updatePassword} from '../controllers/user.controller.js';
import {authMiddleware,isAdmin} from '../middleware/authMiddleware.js';

const authRouter = express.Router();
                                                //order of the routes matter
authRouter.post('/register',createUser);
authRouter.post("/forgot-password-token",forgotPasswordToken);
authRouter.put("/reset-password/:token",resetPassword);

authRouter.put("/update-password",authMiddleware,updatePassword);
authRouter.post('/login',login);
authRouter.post('/admin-login',adminLogin);
authRouter.get('/all-users',getAllUsers);
authRouter.get('/refresh',handleRefreshToken);  //here we get the refresh token,the place where the handleRefreshToken placed is important
authRouter.get('/logout',logOut);
authRouter.get('/wishlist',authMiddleware,getWishList);

authRouter.get('/:id',authMiddleware,isAdmin,getAUser);
authRouter.delete('/:id',deleteAUser);

authRouter.put('/edit-user',authMiddleware,updateAUser);
authRouter.put('/save-address',authMiddleware,saveAddress);
authRouter.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
authRouter.put('/unBlock-user/:id',authMiddleware,isAdmin,unBlockUser);      //unBlock-user/:id the id we need to block



export default authRouter;