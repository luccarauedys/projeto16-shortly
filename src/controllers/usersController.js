import db from './../config/database.js';

export const getUserInfos = async (req, res) => {
  const userId = parseInt(req.params.id);
  const idByToken = res.locals.userId;
  if (userId !== idByToken) return res.sendStatus(401);

  try {
    const { rows: user } = await db.query(
      `
    SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount" 
    FROM users LEFT JOIN urls ON urls."userId" = users.id
    WHERE users.id = $1 AND users."deletedAt" IS NULL
    GROUP BY users.id;
    `,
      [userId]
    );

    const { rows: shortenedUrls } = await db.query(
      `
    SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls
    JOIN users ON users.id = urls."userId"
    WHERE users.id = $1;
    `,
      [userId]
    );

    const result = formatResponse(user[0], shortenedUrls);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRanking = async (req, res) => {
  try {
    const { rows: ranking } = await db.query(`
    SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitCount") as "visitCount" FROM users 
    LEFT JOIN urls ON users.id = urls."userId"
    WHERE urls."deletedAt" IS NULL AND users."deletedAt" IS NULL
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;
    `);
    res.status(200).send(ranking);
  } catch (error) {
    res.status(500).send(error);
  }
};

function formatResponse(obj, arr) {
  return {
    ...obj,
    shortenedUrls: arr,
  };
}
