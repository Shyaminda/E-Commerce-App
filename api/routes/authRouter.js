import express from 'express';
import {createUser,deleteAUser,getAUser,getAllUsers,login} from '../controllers/user.controller.js';

const authRouter = express.Router();

authRouter.post('/register',createUser);
authRouter.post('/login',login);
authRouter.get('/all-users',getAllUsers);
authRouter.get('/:id',getAUser);
authRouter.delete('/:id',deleteAUser);


export default authRouter;