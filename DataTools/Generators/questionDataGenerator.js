const faker = require('faker');
const { performance } = require('perf_hooks');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const questionDataGenerator = (start) => {
  const t0 = performance.now();
  let startId = 1000000 * start;
  const result = [];
  faker.seed(startId);
  for (let i = 0; i < 1000000; i++) {
    result[i] = {
      id: (startId + i),
      product_id: Math.floor(Math.random() * start),
      body: faker.lorem.sentence() + '?',
      date_written: faker.date.past().toISOString().split('T')[0],
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
    const t1 = performance.now();
    const time = t1 - t0;
    console.log(`...Done in ${time}`);
  })
  .catch((err) => {
    console.log(err);
  })
};

// commented out all but 3 at a time to run and generate csv file and populate with data
  // tried running in blocks and deleting but still overloads memory
  // trying to force garbage collection but probably not importing function correctly
  // not sure that forcing garbage collection would work the way I expect
  // look at using fs and move towards leanQuestion.js and get that running to test perf
const generateAll = async () => {
  // await questionDataGenerator(4);
  // await questionDataGenerator(5);
  // await questionDataGenerator(6);
  // await questionDataGenerator(7);
  // await questionDataGenerator(8);
  // await questionDataGenerator(9);
  // await questionDataGenerator(10);
  let eight = await questionDataGenerator(11);
  let nine = await questionDataGenerator(12);
}

generateAll();