const dbAnswers = require('../DB/dbAnswers');


// TODO: post route working for answers hitting route with post
const answers = {};

answers.get = async (req, res) => {
  try {
    console.log(req.params)
    const count = req.params.count ? req.params.count : 5;
    const answersFound = await dbAnswers.get(req.params.question_id, count);
    res.send(answersFound);
  } catch {
    console.error('error getting answers');
    res.sendStatus(404);
  }
};

answers.post = async (req, res) => {
  try {
    console.log('create answer body: ', req.body);
    const answerPost = await dbAnswers.add(req.body);
    console.log('answerPost: ', answerPost);
    res.sendStatus(201);
  } catch {
    console.error('error posting answer');
    res.sendStatus(404);
  }
}

module.exports = answers;
