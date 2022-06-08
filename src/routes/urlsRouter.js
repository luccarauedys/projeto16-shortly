import express from 'express';

import {
  createUrl,
  getUrl,
  redirectUrl,
  deleteUrl,
} from './../controllers/urlsController.js';

import {
  validateUrlInfos,
  getUserIdByToken,
  getUrlByShortUrl,
} from './../middlewares/urlsMiddlewares.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten', validateUrlInfos, getUserIdByToken, createUrl);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.get('/urls/open/:shortUrl', getUrlByShortUrl, redirectUrl);
urlsRouter.delete('/urls/:id', getUserIdByToken, deleteUrl);

export default urlsRouter;
