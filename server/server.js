const nr = require('newrelic');
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const { questions, answers } = require('./routes/routes');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// TODO: get photos within get answers
// TODO: post functionality working
// TODO: update functionality working

// QUESTION ROUTES
// get questions
app.get('/qa/:product_id', (req, res) => questions.get(req, res));
// create question
app.post('/qa/:product_id', (req, res) => questions.add(req, res));
// update question helpful
app.put('/qa/question/:question_id/helpful', (req, res) => questions.helpful(req, res));
// update question reported
app.put('/qa/question/:question_id/report', (req, res) => questions.report(req, res));

// ANSWER ROUTES
// get answers
app.get('/qa/:question_id/answers', (req, res) => answers.get(req, res));
// create answer
app.post('/qa/:question_id/answers', (req, res) => answers.post(req, res));
// update answer helpful
app.put('/qa/answer/:answer_id/helpful', (req, res) => answers.helpful(req, res));
// update question helpful
app.put('/qa/answer/:answer_id/report', (req, res) => answers.report(req, res));


app.listen(port, () => { console.log(`The sever is running on port ${port}`)});
