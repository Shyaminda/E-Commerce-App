import express from 'express';
import createUser from '../controllers/user.controller.js';

const authRouter = express.Router();

authRouter.post('/register',createUser)


export default authRouter;