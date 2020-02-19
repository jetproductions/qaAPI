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

// question routes
// get questions
app.get('/qa/:product_id', (req, res) => questions.get(req, res));

// create question
app.post('/qa/:product_id', async (req, res) => {
  console.log('hit post route');
  try {
    const added = await dbQuestions.add(req.body);
    console.log('added question res: ', added);
    res.sendStatus(added);
  }
  catch {
    console.log('error posting data');
    res.sendStatus(404);
  }
});

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
// app.get('/qa/:question_id/answers', async (req, res) => {
//   // need try/catch block
//   const count = req.params.count ? req.params.count : 5;
//   try {
//     const answersFound = await db.get(req.params.question_id, 'answers', count);
//     answersFound.forEach(async (answer) => {
//       answer.photos = [];
//     });

//     // db.get call for each answer to get photos for each
//     for (let i = 0; i < answersFound.length; i++) {
//       let photos = await db.get(answersFound[i].id, 'answers_photos', 5);
//       answersFound[i].photos = photos;
//     }
//     res.send(answersFound);
//   } catch {
//     console.log('error in get answers');
//     res.sendStatus(404);
//   }
//   // console.log('answers after photos arr added: ', answersFound);
// });

// create answer
app.post('/qa/:question_id/answers', (req, res) => {
  res.sendStatus(201);
});

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