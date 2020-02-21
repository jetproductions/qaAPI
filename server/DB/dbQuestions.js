const { Pool } = require('pg');

const Setup = require('./setup');

// TODO: refactor get query to get 5 answers associated with each question
// TODO: structure get data to Client expectations
// TODO: refactor update functions into one

const questions = {};
const pool = new Pool(Setup);

questions.get = async (id, count = 5) => {
  await pool.connect();
  // how to get count number of answers for each question in this query
  const queryText = {
    text: 'SELECT * FROM questions q LEFT JOIN answers a ON q.id = a.question_id LEFT JOIN photos p ON a.id = p.answer_id WHERE q.product_id =$1  AND q.reported=0 ORDER BY q.helpful LIMIT $2 ',
    values: [id, count]
  };
  const res = await pool.query(queryText);
  return res.rows;
};
const example = {
  "product_id": "5",
  "results": [{
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": 0,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
      }
    }
  }]
};

questions.add = async (req) => {
  await pool.connect();

  try {
    const { product_id } = req.params;
    const { body, asker_name, asker_email } = req.body;

    let date = new Date();
    date = date.toISOString().split('T')[0];

    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM questions');
    id = id.rows[0]['?column?'] + 1;

    const queryText = {
      text: 'INSERT INTO questions(id, product_id, question_body, question_date_written, asker_name, asker_email) VALUES($1, $2, $3, $4, $5, $6)',
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
  await pool.connect();
  id = parseInt(id);
  
  try {
    const queryText = {
      text: 'UPDATE questions SET helpful = helpful + 1 WHERE id = $1',
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

// should report be a delete function?
questions.report = async (id) => {
  await pool.connect();

  try {
    const queryText = {
      text: 'UPDATE questions SET reported = reported + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  } catch {
    console.log(`error in questionDB.report`);
    return 'error';
  }
};

module.exports = questions;