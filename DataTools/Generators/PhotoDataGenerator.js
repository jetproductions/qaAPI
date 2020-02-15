const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
  await dataGenerator(2);
  await dataGenerator(3);
  await dataGenerator(4);
  await dataGenerator(5);
  await dataGenerator(6);
  await dataGenerator(7);
  await dataGenerator(8);
  await dataGenerator(9);
  await dataGenerator(10);
}
generateAll();
