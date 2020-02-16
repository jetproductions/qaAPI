
const questions = require('express').Router();

// ALL QUESTION ROUTES
// read questions
questions.get('/qa/:product_id', (req, res) => {
  res.status(200);
});
// create question
questions.post('qa/:product_id', (req, res) => {
  res.sendStatus(201);
});
// update question helpful
questions.put('/qa/question/:question_id/helpful', (req, res) => {
  res.sendStatus(204);
});
// update question reported
questions.put('/qa/question/:question_id/report', (req, res) => {
  res.sendStatus(204);
});

module.exports = questions;