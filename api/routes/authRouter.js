import express from 'express';
import {createUser,login} from '../controllers/user.controller.js';

const authRouter = express.Router();

authRouter.post('/register',createUser);
authRouter.post('/login',login);


export default authRouter;