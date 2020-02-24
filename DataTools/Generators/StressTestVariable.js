const Faker = require('faker');

function variableGenerator(userContext, events, done) {
  const name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  const email = Faker.internet.exampleEmail();
  const body = Faker.lorem.sentence();
  const qid = Math.floor(Math.random() * 1000000);
  const aid = Math.floor(Math.random() * 1000000);

  userContext.vars.name = name;
  userContext.vars.email = email;
  userContext.vars.body = body;
  userContext.vars.qid = qid;
  userContext.vars.aid = aid;

  return done();
};

module.exports = {
  variableGenerator,
}