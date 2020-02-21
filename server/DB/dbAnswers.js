const { Pool } = require('pg');

const Setup = require('./setup');
// const Photos = require('./dbAnswerPhotos');

// TODO: get needs to also get answers_photos for each photo
// TODO: structure get data to Client expectations
// TODO: refactor report and helpful into 1 update function
// TODO: refactor add photos to only need 1 query to insert all

const answers = {};
const pool = new Pool(Setup);

answers.get = async (id, count = 5) => {
  await pool.connect();
  try {
    const queryText = {
      text: 'SELECT p.id AS photo_id, p.url AS url, ans.id AS id, body, a_name AS name,  FROM photos p RIGHT JOIN answers ans ON p.answer_id = ans.id WHERE ans.question_id IN (SELECT ans.id FROM answers ans WHERE ans.question_id = $1 LIMIT $2) ORDER BY ans.helpful DESC LIMIT 4',
      values: [id, count]
    };
    const res = await pool.query(queryText);
    console.log(res.rows);
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
    let date = new Date();
    
    date = date.toISOString().split('T')[0];
    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM answers');

    id = id.rows[0]['?column?'] + 1;

    const queryText = {
      text: `INSERT INTO answers(id, question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5, $6)`,
      values: [id, question_id, body, date, answerer_name, answerer_email]
    };
    
    const res = await pool.query(queryText);

    if (photos.length > 0) {
      let photoQuery = `INSERT INTO photos(id, answer_id, url) VALUES`;
      try {
        let photoId = await pool.query('SELECT MAX(id) + 1 FROM photos');
        photoId = photoId.rows[0]['?column?'] !== null ?  photoId.rows[0]['?column?'] + 1 : 1;
        photos.forEach((photo, i) => {
          let unique = photoId + i;
          photoQuery.concat(`(${unique}, ${id}, '${photo.url}')`);
          i === photos.length - 1 ? null : photoQuery.concat(',');
        });
      } catch {
        console.log('error inserting photos');
        return 'error in photos';
      }
    }
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
      text: 'UPDATE answers SET helpful = helpful + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  } catch {
    console.log(`error in answersDB.report`);
    return 'error';
  }
};

answers.report = async (id) => {
  // const pool = new Pool(Setup);
  await pool.connect();
  
  try {
    const queryText = {
      text: 'UPDATE answers SET reported = reported + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  } catch {
    console.log(`error in answerDB.report`);
    return 'error';
  }
};
module.exports = answers;