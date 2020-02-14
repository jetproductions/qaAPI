const faker = require('faker');

const answerDataGenerator = () => {
  let start = 100000000;
  const result = {};
  faker.seed(10000000);
  for (let i = 0; i < 10; i++) {
    result[start + i] = {
      id: (start + i),
      question_id: Math.floor(Math.random() * start),
      body: faker.lorem.sentence(),
      date_written: faker.date.past(),
      answerer_name: faker.name.firstName() + ' ' + faker.name.lastName(),
      answerer_email: faker.internet.email(),
      reported: 0,
      helpful: Math.floor((Math.random() * 100)),
    } 
  }
  console.log(result);
  return;
};
answerDataGenerator();
