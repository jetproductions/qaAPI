const { Pool, Client } = require('pg');

const { login, password } = require('../../DataTools/dbcredentials');


// TODO: add and update stubbed out but not working yet
const setup = {
  user: login,
  host: 'localhost',
  database: 'db_auto',
  schema: 'questions_answers',
  password,
  port: 5432,
}
// working just takes some time 
const get = async (product_id, type, count) => {
  const client = new Client(setup);
  client.connect();
  const res = await client.query(`SELECT * FROM questions_answers.${type} WHERE product_id=${product_id} LIMIT ${count}`);
  client.end();
  return res
};

const add = async (data) => {
  try {  console.log('hitting add: ', data);
    // add YYYY-MM-DD date generator below
    const date_writen = 'current-date';
    data = [data.id, data.product_id, data.body, date_writen, data.asker_name, data.asker_email, 0, 0];
    const client = new Client(setup);
    client.connect();
    const res = await client.query(`INSERT INTO questions_answers.questions VALUES ${data}`);
    client.end();
    return res;
  }
  catch {
    console.log('error in questionDB.add');
  }
}
const update = async (question_id, target) => {
  try{
    const client = new Client(setup);
    client.connect();
    const res = await client.query(`UPDATE questions_answers.questions SET ${target}= ${target} + 1  WHERE id=${question_id} `);
    return res;
  }
  catch {
    console.log(`error in questionDB.update with ${target}`)
  }
}
module.exports = {
  get,
  add,
  update,
}