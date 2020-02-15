// can convert to ES6 if use transpiler
const faker = require('faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const answerDataGenerator = async (start) => {
  let startId = 100000000 * start;
  const result = [];
  faker.seed(startId);
  for (let i = 0; i < 100000; i++) {
    result[i] = {
      id: (startId + i),
      question_id: Math.floor(Math.random() * startId),
      body: faker.lorem.sentence(),
      date_written: faker.date.past(),
      answerer_name: faker.name.firstName() + ' ' + faker.name.lastName(),
      answerer_email: faker.internet.email(),
      reported: 0,
      helpful: Math.floor((Math.random() * 100)),
    } 
  }
  const csvWriter = createCsvWriter({
    path: `./CSV/Answers/answers${start}.csv`,
    header: ['id', 'question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful']
  });
  csvWriter.writeRecords(result)
  .then(() => {
    console.log('...Done');
  })
  .catch((err) => {
    console.log(err);
  })
};

// refactor so can do async await for each with input of function and number
const generateAll = async () => {
  await answerDataGenerator(2);
  await answerDataGenerator(3);
  await answerDataGenerator(4);
  await answerDataGenerator(5);
  await answerDataGenerator(6);
  await answerDataGenerator(7);
  await answerDataGenerator(8);
  await answerDataGenerator(9);
  await answerDataGenerator(10);
}
generateAll();
