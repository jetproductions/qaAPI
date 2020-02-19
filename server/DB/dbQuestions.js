const { Pool, Client } = require('pg');

const Setup = require('./setup');

// TODO: refactor update functions into one

const questions = {}
// working just takes some time 
questions.get = async (id, count = 5) => {
  const client = new Client(Setup);
  client.connect();

  const res = await client.query(`SELECT * FROM questions_answers.questions WHERE product_id=${id} LIMIT ${count}`);
  client.end();
  return res.rows;
};

questions.add = async (req) => {
  const pool = new Pool(Setup);
  await pool.connect();

  try {
    const product_id = req.params.product_id;
    const { body, asker_name, asker_email } = req.body;

    let date = new Date();
    date = date.toISOString().split('T')[0];

    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM questions_answers.questions');
    id = id.rows[0]['?column?'] + 1;

    const queryText = {
      text: 'INSERT INTO questions_answers.questions(id, product_id, body, date_written, asker_name, asker_email) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, product_id, body, date, asker_name, asker_email],
    };
    const res = await pool.query(queryText);
    console.log('res for add answer: ', res.rows);

    return res;
  } catch {
    console.log('error in questionDB.add');
    return 'error'
  }
};

questions.helpful = async (id) => {
  const pool = new Pool(Setup);
  await pool.connect();
  id = parseInt(id);
  
  try {
    const queryText = {
      text: 'UPDATE questions_answers.questions SET helpful = helpful + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  }
  catch {
    console.log(`error in questionDB.helpful`);
    return 'error';
  }
};

questions.report = async (id) => {
  const pool = new Pool(Setup);
  await pool.connect();
  // id = parseInt(id);
  
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

module.exports = questions;