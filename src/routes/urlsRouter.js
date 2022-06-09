import express from 'express';

import {
  createUrl,
  getUrl,
  redirectUrl,
  deleteUrl,
} from './../controllers/urlsController.js';

import {
  validateUrlInfos,
  getUrlByShortUrl,
} from './../middlewares/urlsMiddlewares.js';

import { verifyToken } from './../middlewares/verifyToken.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten', validateUrlInfos, verifyToken, createUrl);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.get('/urls/open/:shortUrl', getUrlByShortUrl, redirectUrl);
urlsRouter.delete('/urls/:id', verifyToken, deleteUrl);

export default urlsRouter;
