import db from './../config/database.js';

export const verifyUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  try {
    const { rows: user } = await db.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);
    if (!user[0]) return res.sendStatus(404);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
