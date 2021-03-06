const { Pool, Client } = require('pg');

const Setup = require('./setup');


// TODO: double check that this file is necessary
const answerPhotos = {};

answerPhotos.get = async (id, count) => {
  const pool = new Client(Setup);
  const client = await pool.connect();

  try {
    const res = await client.query(`SELECT * FROM photos WHERE answer_id=${id} LIMIT ${count}`);
    await client.release();
    return res.rows;
  } catch {
    console.log('error in dbAnswers.get');
  }
};

// need to structure to run for every photo
answerPhotos.add = async (answer) => {
  const pool = new Pool(Setup);
  const client = await pool.connect();

  try {
    const { photos, answer_id } = answers;
    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM photos');
    id = id.rows[0]['?column?'] + 1;
    const queryText = {
      text: 'INSERT INTO photos(id, answer_id, url) VALUES($1, $2, $3) RETURNING id',
      values: [id, answer_id, url],
    };
    const res = await client.query(queryText);
    await client.release();
    return res;
  } catch {
    console.log('error in dbAnswers.add');
    return 'error';
  }
};

module.exports = answerPhotos;