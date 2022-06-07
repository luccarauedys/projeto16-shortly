import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from './../config/database.js';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',[name, email, passwordHash]);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let { rows: user } = await db.query('SELECT * FROM users WHERE email = $1',[email]);
    if (!user[0] || !bcrypt.compareSync(password, user[0].password)) {
      return res.sendStatus(401);
    }
    const token = uuidv4();
    await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', [token, user[0].id]);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
