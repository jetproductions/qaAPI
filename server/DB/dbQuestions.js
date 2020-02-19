const { Pool, Client } = require('pg');
const Setup = require('./setup');
// TODO: add and update stubbed out but not working yet

// working just takes some time 
const get = async (id, count = 5) => {
  const client = new Client(Setup);
  client.connect();

  const res = await client.query(`SELECT * FROM questions_answers.questions WHERE product_id=${id} LIMIT ${count}`);
  client.end();
  return res.rows;
};

const add = async (data) => {
  try {  console.log('hitting add: ', data);
    let date = new Date();
    date = date.toISOString().split('T')[0];
    const client = new Client(Setup);
    client.connect();
    const queryText = {
      text: 'INSERT INTO questions_answers.questions(product_id, body, date_written, asker_name, asker_email) VALUES($1, $2, $3, $4,  $5)',
      values: [data.product_id, data.body, date, data.asker_name, data.asker_email],
    };
    const res = await client.query(queryText);
    client.end();
    return res;
  } catch {
    console.log('error in questionDB.add');
  }
}
const update = async (question_id, target) => {
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
}
module.exports = {
  get,
  add,
  update,
}