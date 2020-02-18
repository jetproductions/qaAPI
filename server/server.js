const express = require('express');
const app = express();
// const questions = require('./routes/questionRoutes');
// const answers = require('./routes/answerRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionDB = require('./DB/questionsDB');
const answerDB = require('./DB/answerDB');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// question routes
// get questions
app.get('/qa/:product_id', async (req, res) => {
  console.log('product_id: ', req.params.product_id)
  const questionsFound = await questionDB.get(req.params.product_id);
  res.send(questionsFound);
});
// create question
app.post('/qa/:product_id', (req, res) => {
  res.sendStatus(201);
});
// update question helpful
app.put('/qa/question/:question_id/helpful', (req, res) => {
  res.sendStatus(204);
});
// update question reported
app.put('/qa/question/:question_id/report', (req, res) => {
  res.sendStatus(204);
});

// answer routes
// get answers
app.get('/qa/:question_id/answers', (req, res) => {
  res.sendStatus(200);
});
// create answer
app.post('/qa/:question_id/answers', (req, res) => {
  res.sendStatus(201);
});
// update answer helpful
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  res.sendStatus(204);
})
// update question helpful
app.put('/qa/answer/:answer_id/report', (req, res) => {
  res.sendStatus(204);
})


app.listen(port, () => { console.log(`The sever is running on port ${port}`)});


/* 
Still need to add code to support parameters that are possible in client side queries
In an HTTP GET request, parameters are sent as a query string:

http://example.com/page?parameter=value&also=another

In an HTTP POST or PUT request, the parameters are not sent along with the URI, but in the request body. Parameters noted for each route below follow this standard.
*/