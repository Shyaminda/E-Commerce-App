import express from 'express';
import {blockUser, createUser,deleteAUser,getAUser,getAllUsers,login, unBlockUser, updateAUser} from '../controllers/user.controller.js';
import {authMiddleware,isAdmin} from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register',createUser);
authRouter.post('/login',login);
authRouter.get('/all-users',getAllUsers);
authRouter.get('/:id',authMiddleware,isAdmin,getAUser);
authRouter.delete('/:id',deleteAUser);
authRouter.put('/edit-user',authMiddleware,updateAUser);
authRouter.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
authRouter.put('/unBlock-user/:id',authMiddleware,isAdmin,unBlockUser);      //unBlock-user/:id the id we need to block


export default authRouter;