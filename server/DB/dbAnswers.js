const { Pool } = require('pg');

const Setup = require('./setup');
// const Photos = require('./dbAnswerPhotos');

// TODO: get needs to also get answers_photos for each photo
// TODO: structure get data to Client expectations
// TODO: add needs to check if photos and then add them if necessary
// TODO: refactor report and helpful into 1 update function

const answers = {};
const pool = new Pool(Setup);

answers.get = async (id, count) => {
  await pool.connect();

  try {
    // don't know why this one template literal works and not others
    const res = await pool.query(`SELECT * FROM questions_answers.answers WHERE question_id=${id} LIMIT ${count}`);
    return res.rows;
  } catch {
    console.log('error in dbAnswers.get');
  }
};

answers.add = async (answer) => {
  await pool.connect();
  try {
    const { body, answerer_name, answerer_email } = answer.body;
    const { question_id } = answer.params;
    const photos = answer.body.photos || [];
    const length = photos.length;

    let date = new Date();
    date = date.toISOString().split('T')[0];
    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM questions_answers.answers');
    id = id.rows[0]['?column?'] + 1;
    const queryText = {
      text: 'INSERT INTO questions_answers.answers(id, question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, question_id, body, date, answerer_name, answerer_email]
    };
    const res = await pool.query(queryText);
    return res;
  } catch {
    console.log('error in dbAnswers.add');
    return 'error';
  }
};

answers.helpful = async (id) => {
  await pool.connect();
  
  try {
    const queryText = {
      text: 'UPDATE questions_answers.answers SET helpful = helpful + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  }
  catch {
    console.log(`error in answersDB.report`);
    return 'error';
  }
};

answers.report = async (id) => {
  // const pool = new Pool(Setup);
  await pool.connect();
  
  try {
    const queryText = {
      text: 'UPDATE questions_answers.questions SET reported = reported + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  }
  catch {
    console.log(`error in questionDB.report`);
    return 'error';
  }
};
module.exports = answers;