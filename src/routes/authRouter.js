import express from 'express';

import { signUp, signIn } from './../controllers/authController.js';
import { validateSignUpInfos, validateSignInInfos } from '../middlewares/authMiddlewares.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignUpInfos, signUp);
authRouter.post('/signin', validateSignInInfos, signIn);

export default authRouter;
