const answers = require('express').Router();

// TODO: not working yet 

// ALL ANSWER ROUTES
// read answers for question
answers.get('qa/:question_id/answers', (req, res) => {
  res.status(200);
});
// create answer
answers.post('/qa/:question_id/answers', (req, res) => {
  res.sendStatus(201);
});
// update answer helpful
answers.put('/qa/answer/:answer_id/helpful', (req, res) => {
  res.sendStatus(204);
});
// update answer report 
answers.put('qa/answer/:answer_id/report', (req, res) => {
  res.sendStatus(204);
});

module.exports = answers;
