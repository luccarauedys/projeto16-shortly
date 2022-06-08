import express from 'express';

import { getUser, getUsersRanking } from './../controllers/usersController.js';

// TODO: Importar os middlewares

const usersRouter = express.Router();

usersRouter.get('/users/:id', getUser);
usersRouter.get('/users/ranking', getUsersRanking);

export default usersRouter;
