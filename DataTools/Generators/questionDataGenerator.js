const faker = require('faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const questionDataGenerator = (start) => {
  let startId = 1000000 * start;
  const result = [];
  faker.seed(startId);
  for (let i = 0; i < 900000; i++) {
    result[i] = {
      id: (startId + i),
      product_id: Math.floor(Math.random() * start),
      body: faker.lorem.sentence() + '?',
      date_written: faker.date.past(),
      asker_name: faker.name.firstName() + ' ' + faker.name.lastName(),
      asker_email: faker.internet.email(),
      reported: 0,
      helpful: Math.floor((Math.random() * 100)),
    } 
  }
  const csvWriter = createCsvWriter({
    path: `./CSV/Questions/questions${start}.csv`,
    header: ['id', 'product_id', 'body', 'date_written', 'asker_name', 'asker_email', 'reported', 'helpful']
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
  await questionDataGenerator(2);
  await questionDataGenerator(3);
  await questionDataGenerator(4);
  await questionDataGenerator(5);
  await questionDataGenerator(6);
  await questionDataGenerator(7);
  await questionDataGenerator(8);
  await questionDataGenerator(9);
  await questionDataGenerator(10);
}
generateAll();