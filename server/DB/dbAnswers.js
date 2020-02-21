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
      text: 'SELECT * FROM answers JOIN answers_photos ON answers.id = answers_photos.answer_id WHERE answers.question_id =$1  LIMIT $2',
      values: [id, count]
    };
    const res = await pool.query(queryText);
    console.log(res.rows[0]);
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
      // refactor to allow for multiple insert values when needed through template literal for photoQuery
      
      photos.forEach( async (photo) => {
        try {
          let photoId = await pool.query('SELECT MAX(id) + 1 FROM answers_photos');
          photoId = photoId.rows[0]['?column?'] !== null ?  photoId.rows[0]['?column?'] + 1 : 1;
          console.log('photoId: ', photoId);
          let photoQuery = {
            text: 'INSERT INTO answers_photos(id, answer_id, url) VALUES($1, $2, $3)',
            values: [photoId, id, photo.url]
          }
          let addPhoto = await pool.query(photoQuery);
          console.log('addPhoto: ', addPhoto);
          return addPhoto ? addPhoto : 'error';
        } catch {
          console.log('error inserting photos');
          return 'error in photos';
        }
      });
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