const express = require('express');
const app = express();
// const questions = require('./routes/questionRoutes');
// const answers = require('./routes/answerRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const { questions, answers } = require('./routes/routes');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// TODO: get photos within get answers
// TODO: post functionality working
// TODO: update functionality working
// TODO: router files working to clean up code

// QUESTION ROUTES
// get questions
app.get('/qa/:product_id', (req, res) => questions.get(req, res));

// create question
app.post('/qa/:product_id', (req, res) => questions.add(req, res));

// update question helpful
app.put('/qa/question/:question_id/helpful', async (req, res) => {
  res.sendStatus(204);
});

// update question reported
app.put('/qa/question/:question_id/report', (req, res) => {
  res.sendStatus(204);
});

// answer routes
// get answers
app.get('/qa/:question_id/answers', (req, res) => answers.get(req, res));

// create answer
app.post('/qa/:question_id/answers', (req, res) => answers.post(req, res));

// update answer helpful
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  res.sendStatus(204);
});

// update question helpful
app.put('/qa/answer/:answer_id/report', (req, res) => {
  res.sendStatus(204);
});

app.listen(port, () => { console.log(`The sever is running on port ${port}`)});


/* 
Still need to add code to support parameters that are possible in client side queries
In an HTTP GET request, parameters are sent as a query string:

http://example.com/page?parameter=value&also=another

In an HTTP POST or PUT request, the parameters are not sent along with the URI, but in the request body. Parameters noted for each route below follow this standard.
*/