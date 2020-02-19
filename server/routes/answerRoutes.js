const dbAnswers = require('../DB/dbAnswers');

const answers = {};
answers.get = async (req, res) => {
  try {
    console.log(req.params)
    const count = req.params.count ? req.params.count : 5;
    const answersFound = await dbAnswers.get(req.params.question_id, count);
    res.send(answersFound);
  } catch {
    console.error('error with getting answers');
    res.sendStatus(404);
  }
}
module.exports = answers;
