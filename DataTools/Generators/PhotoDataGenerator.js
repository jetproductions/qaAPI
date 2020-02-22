const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { performance } = require('perf_hooks');

const photoDataGenerator = (start) => {
  let startId = start * 1000000;
  const result = [];
  faker.seed(startId);
  for (let i = 0; i < 1000000; i++) {
    result.push( {
      id: (startId + i),
      answer_id: faker.random.number(),
      url: faker.image.imageUrl()
    });
  }
  const csvWriter = createCsvWriter({
    path: `./CSV/AnswerPhotos/answers_photos${start}.csv`,
    header: ['id', 'answer_id', 'url']
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
  const t0 = performance.now();
  await photoDataGenerator(4);
  await photoDataGenerator(5);
  await photoDataGenerator(6);
  await photoDataGenerator(7);
  await photoDataGenerator(8);
  await photoDataGenerator(9);
  await photoDataGenerator(10);
  await photoDataGenerator(11);
  await photoDataGenerator(12);
  const t1 = performance.now();
  const time = t1 - t0;
  console.log(`Photo Data Created in ${time}`);
}
generateAll();
