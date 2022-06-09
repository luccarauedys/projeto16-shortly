import db from './../config/database.js';
import urlSchema from '../schemas/urlSchema.js';

export const validateUrlInfos = (req, res, next) => {
  const urlInfos = req.body;
  const err = urlSchema.validate(urlInfos);
  if (err) return res.status(422).send(err);
  next();
};

export const getUrlByShortUrl = async (req, res, next) => {
  const shortUrlParam = req.params.shortUrl;
  try {
    const result = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [
      shortUrlParam,
    ]);
    if (result.rowCount === 0) return res.sendStatus(404);
    const fetchedUrl = result.rows[0];
    res.locals.fetchedUrl = fetchedUrl;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
