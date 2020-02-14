const faker = require('faker');

const photoDataGenerator = () => {
  const result = {};
  faker.seed(10000000);
  for (let i = 0; i < 10; i++) {
    result[100000000 + i] = {
      id: (100000000 + i),
      answer_id: faker.random.number(),
      url: faker.image.imageUrl()
    } 
  }
  console.log(result);
  return;
};
photoDataGenerator();