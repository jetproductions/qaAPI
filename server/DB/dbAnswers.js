const { Pool, Client } = require('pg');
const Setup = require('./setup');

const get = async (id, count) => {
  const client = new Client(Setup);
  client.connect();
  const res = await client.query(`SELECT * FROM questions_answers.answers WHERE question_id=${id} LIMIT ${count}`);
  client.end();
  return res.rows;
};

module.exports = {
  get,
}