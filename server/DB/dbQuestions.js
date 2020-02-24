const { Pool } = require('pg');

const Setup = require('./setup');


// TODO: refactor update functions into one
// TODO: refactor data structuring to have better time complexity

const questions = {};
const pool = new Pool(Setup);

questions.get = async (id, count = 5) => {
  await pool.connect();
  try { 
    const ansCount = count * 5;
    const queryText = {
      text: `SELECT ans.id AS ans_id, ans.question_id, ans.body AS ans_body, q.body AS q_body, asker_name, answerer_name, q.date_written AS q_date, ans.date_written AS ans_date, q.helpful AS question_helpfulness, ans.helpful AS helpfulness, link AS url, p.id AS photo_id
      FROM questions q
      LEFT JOIN answers ans 
      ON q.id = ans.question_id
      LEFT JOIN photos p 
      ON ans.id = p.answer_id
      WHERE ans.question_id 
      IN (SELECT q.id FROM questions q WHERE q.product_id = $1 LIMIT $2) 
      LIMIT $3`,
      values: [id, ansCount, count]
    };

    const res = await pool.query(queryText);

    let results = [];

    res.rows.forEach((row) => {
      let exists = -1;
      if (results.length > 0) {
        exists = results.findIndex((element) => element.question_id  === row.question_id);
      }
      const { ans_id, ans_body, answerer_name, ans_date, helpfulness } = row;
       
      const answer = {
        id: ans_id,
        body: ans_body,
        date: ans_date,
        answerer_name,
        helpfulness,
        photos: [],
      }

      if (exists !== -1) {
        results[exists].answers[ans_id] = answer;
      } else {
        const { q_body, question_id, question_helpfulness, q_date, asker_name } = row;
        const question = {
          question_id,
          question_helpfulness,
          question_date: q_date,
          asker_name,
          question_body: q_body,
          answers: {}
        }
        question.answers[ans_id] = answer;
        results = results.concat(...results, question);
      }
    });

    res.rows.forEach((row) => {
      const { photo_id, url, ans_id, question_id } = row;
      const photo = photo_id !== null ? { id: photo_id, url } : null;
      if (photo === null) return;
      let index = results.findIndex((element) => element.question_id === question_id);
      if (index === -1) return;
      let location = results[index].answers[ans_id].photos;
      if (location.length === 0) {
        location.push(photo);
      } else {
        location = location.concat(...location, photo);
      }
    })

    const structured = {
      product_id: id,
      results,
    }
    return structured;
  } catch {
    console.log('error in dbQuestions.get');
    return 'error';
  }
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
