import db from '../config/database.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const result = await db.query('SELECT * FROM sessions WHERE token = $1', [
      token,
    ]);
    const session = result.rows[0];
    if (!session) return res.sendStatus(401);
    res.locals.userId = session.userId;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
