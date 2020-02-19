const dbQuestions = require('../DB/dbQuestions');
const questions = {};

questions.get = async (req, res) => {
  console.log('product_id: ', req.params.product_id);
  const count = req.params.count ? req.params.count : 5;
  console.log('count: ', count);
  const questionsFound = await dbQuestions.get(req.params.product_id, count);
  res.send(questionsFound);
},
questions.post = () => {

},
questions.update = () => {
  
},


module.exports = questions;