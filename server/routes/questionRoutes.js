
const express = require('express');
const questions = express.Router();


questions.get = ('/qa/:product_id',(req, res) => {
  console.log('router is working');
  res.status(200);
});
questions.post = ('/qa/:product_id/', (req, res) => {
  res.sendStatus(201);
});
// TODO: not working yet 

// ALL QUESTION ROUTES
// read questions


module.exports = questions;