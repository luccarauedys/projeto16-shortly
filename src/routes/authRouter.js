import express from 'express';

import { signUp, signIn } from './../controllers/authController.js';
import { validateSignUpInfos } from '../middlewares/authMiddlewares.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignUpInfos, signUp);
authRouter.post('/signin', signIn);

export default authRouter;
