import express from 'express';
import {createUser,deleteAUser,getAUser,getAllUsers,login, updateAUser} from '../controllers/user.controller.js';
import {authMiddleware,isAdmin} from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register',createUser);
authRouter.post('/login',login);
authRouter.get('/all-users',getAllUsers);
authRouter.get('/:id',authMiddleware,isAdmin,getAUser);
authRouter.delete('/:id',deleteAUser);
authRouter.put('/edit-user',authMiddleware,updateAUser);


export default authRouter;