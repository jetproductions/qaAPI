const dbQuestions = require('../DB/dbQuestions');

const questions = {};

questions.get = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 5;
    const questionsFound = await dbQuestions.get(req.params.product_id, count);
    res.send(questionsFound);
  } catch {
    console.error('error with getting questions');
    res.sendStatus(404);
  }
};

questions.add = async (req, res) => {
  try {
    const added = await dbQuestions.add(req);
    console.log('added question res: ', added);
    return added !== 'error' ? res.sendStatus(201) : res.sendStatus(404);
  } catch {
    console.log('error with posting question');
    res.sendStatus(404);
  }
};

questions.helpful = async (req, res) => {
  try {
    const updated = await dbQuestions.helpful(req.params.question_id);
    return updated !== 'error' ? res.sendStatus(204) : res.sendStatus(404);
  } catch {
    console.log(`error updating helpful questions`);
    res.sendStatus(404);
  }
};

questions.report = async (req, res) => {
  try {
    const updated = await dbQuestions.report(req.params.question_id);
    return updated !== 'error' ? res.sendStatus(204) : res.sendStatus(404);
  } catch {
    console.log('error reporting question');
    res.sendStatus(404);
  }
};


module.exports = questions;