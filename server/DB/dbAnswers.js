const { Pool, Client } = require('pg');
const Setup = require('./setup');

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

const add = async (body) => {
  // this may be better as a Pool operation that then posts photos if needed
  try {
    // how to structure body into data to write to file
    // not sure if below consistently pulls data in same order
    const keys = Object.keys(body);
    const data = Object.values(body);
    console.log('Keys in db are: ', keys);
    const client = new Client(Setup);
    await client.connect();
    const res = await client.query(`INSERT INTO questions_answers.answers ${keys} VALUES ${data}`)
    client.end();
    return res;
  } catch {
    console.log('error in dbAnswers.add');
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