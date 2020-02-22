const faker = require('faker');

const dateGenerator = () => {
  console.log((faker.date.past()).toISOString().split('T')[0]);
}
dateGenerator();