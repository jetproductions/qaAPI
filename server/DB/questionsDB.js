const { Pool, Client } = require('pg');

const { login, password } = require('../../DataTools/dbcredentials');

const setup = {
  user: login,
  host: 'localhost',
  database: 'db_auto',
  schema: 'questions_answers',
  password,
  port: 5432,
}
// working just takes some time 
const get = async (product_id, count = 5) => {
  const client = new Client(setup);
  client.connect();
  const res = await client.query(`SELECT * FROM questions_answers.questions WHERE product_id=${product_id} LIMIT ${count}`);
  client.end();
  return res
}
module.exports = {
  get,
}