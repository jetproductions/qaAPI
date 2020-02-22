const dbAnswers = require('../DB/dbAnswers');

// TODO:
const answers = {};

answers.get = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 5;
    const answersFound = await dbAnswers.get(req.params.question_id, count);
    answersFound !== 'error' ? res.send(answersFound) : res.sendStatus(404);
  } catch {
    console.error('error getting answers');
    res.sendStatus(404);
  }
};

answers.post = async (req, res) => {
  try {
    const answerPost = await dbAnswers.add(req);
    // console.log('answerPost: ', answerPost);
    answerPost !== 'error' ? res.sendStatus(201) : res.sendStatus(404);
  } catch {
    console.error('error posting answer');
    res.sendStatus(404);
  }
};

answers.helpful = async (req, res) => {
  try {
    const updated = await dbAnswers.helpful(req.params.question_id);
    return updated !== 'error' ? res.sendStatus(204) : res.sendStatus(404);
  } catch {
    console.log('error reporting question');
    res.sendStatus(404);
  }
};

answers.report = async (req, res) => {
  try {
    const updated = await dbAnswers.report(req.params.question_id);
    return updated !== 'error' ? res.sendStatus(204) : res.sendStatus(404);
  } catch {
    console.log('error reporting question');
    res.sendStatus(404);
  }
};


module.exports = answers;
