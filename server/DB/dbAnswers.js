const { Pool, Client } = require('pg');

const Setup = require('./setup');
const Photos = require('./dbAnswerPhotos');

// TODO: get needs to also get answers_photos for each photo

const get = async (id, count) => {
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

const add = async (answer) => {
  // this may be better as a Pool operation that then posts photos if needed
  const pool = new Pool(Setup);
  const client = await pool.connect();

  try {
    const { question_id, body, answerer_name, answerer_email } = answer;
    let date = new Date();
    date = date.toISOString().split('T')[0];
    await client.query('BEGIN');
    const queryText = {
      text: 'INSERT INTO questions_answers.answers(question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [question_id, body, date, answerer_name, answerer_email],
      // rowMode: 'array',
    };
    const res = await client.query(queryText);
    console.log('answer in try: ', answer);
    client.release();
    console.log('res for add answer: ', res.rows);
    return res;
  } catch {
    console.log('error in dbAnswers.add');
    return 'error';
  }
};

const update = async (id, type) => {
  try {

  } catch {
    console.log('error in dbAnswers.update');
  }
}
module.exports = {
  get,
  add,
  update,
}