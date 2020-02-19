const { Pool, Client } = require('pg');
const Setup = require('./setup');
// TODO: add and update stubbed out but not working yet

const questions = {}
// working just takes some time 
questions.get = async (id, count = 5) => {
  const client = new Client(Setup);
  client.connect();

  const res = await client.query(`SELECT * FROM questions_answers.questions WHERE product_id=${id} LIMIT ${count}`);
  client.end();
  return res.rows;
};

questions.add = async (data) => {
  const pool = new Pool(Setup);

  try {
    let date = new Date();
    date = date.toISOString().split('T')[0];

    await pool.connect();

    let id = await pool.query('SELECT MAX(id) + 1 FROM questions_answers.questions');
    id.rows[0]['?column?']++;

    const queryText = {
      text: 'INSERT INTO questions_answers.questions(id, product_id, body, date_written, asker_name, asker_email) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, data.product_id, data.body, date, data.asker_name, data.asker_email],
    };
    const res = await client.query(queryText);

    return res;
  } catch {
    console.log('error in questionDB.add');
  }
};

questions.update = async (question_id, target) => {
  try{
    const client = new Client(Setup);
    client.connect();
    const res = await client.query(`UPDATE questions_answers.questions SET ${target}= ${target} + 1  WHERE id=${question_id} `);
    client.end();
    return res; 
  }
  catch {
    console.log(`error in questionDB.update with ${target}`)
  }
};

module.exports = questions;