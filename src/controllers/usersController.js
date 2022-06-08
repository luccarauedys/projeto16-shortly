import db from './../config/database.js';

export const getUser = async (req, res) => {
  const userId = parseInt(req.params.id);

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

export const getUsersRanking = async (req, res) => {};

function formatResponse(obj, arr) {
  return {
    ...obj,
    shortenedUrls: arr,
  };
}
