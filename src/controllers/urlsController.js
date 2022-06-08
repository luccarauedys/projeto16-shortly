import { nanoid } from 'nanoid';
import db from './../config/database.js';

export const createUrl = async (req, res) => {
  const { url } = req.body;
  const { userId } = res.locals;
  try {
    const shortUrl = nanoid();
    await db.query(
      'INSERT INTO urls ("url", "shortUrl", "userId") VALUES ($1, $2, $3)',
      [url, shortUrl, userId]
    );
    res.status(201).send({ shortUrl });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUrl = async (req, res) => {
  const urlId = parseInt(req.params.id);
  try {
    const result = await db.query(
      'SELECT * FROM urls WHERE id = $1 AND "deletedAt" IS NULL',
      [urlId]
    );
    const fetchedUrl = result.rows[0];
    if (!fetchedUrl) return res.sendStatus(404);
    const { id, shortUrl, url } = fetchedUrl;
    res.status(200).send({ id, shortUrl, url });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const redirectUrl = async (req, res) => {
  const { id, url, visitCount } = res.locals.fetchedUrl;
  try {
    await db.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [
      visitCount + 1,
      id,
    ]);
    res.redirect(url);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUrl = async (req, res) => {
  const urlId = parseInt(req.params.id);
  const { userId } = res.locals;
  try {
    const result = await db.query(
      'SELECT * FROM urls WHERE id = $1 AND "deletedAt" IS NULL',
      [urlId]
    );
    if (result.rowCount === 0) return res.sendStatus(404);
    const fetchedUrl = result.rows[0];
    if (fetchedUrl.userId !== userId) return res.sendStatus(401);
    await db.query('UPDATE urls SET "deletedAt" = NOW() WHERE id = $1', [
      urlId,
    ]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
};
