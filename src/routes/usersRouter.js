import express from 'express';

import { getUserInfos, getRanking } from './../controllers/usersController.js';
import { verifyUser } from './../middlewares/usersMiddlewares.js';
import { verifyToken } from './../middlewares/verifyToken.js';

const usersRouter = express.Router();

usersRouter.get('/users/:id', verifyUser, verifyToken, getUserInfos);
usersRouter.get('/ranking', getRanking);

export default usersRouter;
