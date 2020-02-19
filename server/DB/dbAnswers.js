const { Pool, Client } = require('pg');

const Setup = require('./setup');
const Photos = require('./dbAnswerPhotos');

// TODO: get needs to also get answers_photos for each photo
// TODO: add needs to check if photos and then add them if necessary
const answers = {};

answers.get = async (id, count) => {
  try {
    const client = new Client(Setup);
    await client.connect();
    const res = await client.query(`SELECT * FROM questions_answers.answers WHERE question_id=${id} LIMIT ${count}`);
    client.end();
    return res.rows;
  } catch {
    console.log('error in dbAnswers.get');
  }
};

answers.add = async (answer) => {
  const pool = new Pool(Setup);
  await pool.connect();

  try {
    const { question_id, body, answerer_name, answerer_email } = answer;
    const { photos } = answer;

    let date = new Date();
    date = date.toISOString().split('T')[0];

    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM questions_answers.answers');
    id = id.rows[0]['?column?'] + 1;

    const queryText = {
      text: 'INSERT INTO questions_answers.answers(id, question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, question_id, body, date, answerer_name, answerer_email],
    };
    const res = await pool.query(queryText);
    return res;
  } catch {
    console.log('error in dbAnswers.add');
    return 'error';
  }
};

answers.helpful = async (id) => {
  try {

  } catch {
    console.log('error in dbAnswers.update');
  }
}
module.exports = answers;