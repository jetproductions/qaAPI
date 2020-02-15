const fs = require('fs');
const { performance } = require('perf_hooks');
const faker = require('faker');

const leanQuestionGenerator = async (start) => {
  const t0 = performance.now();
  const startId = 1000000 * start;
  const path = `~et/Documents/Hack-RXR-07/SDC/QAAPI/CSV/Questions${start}.csv`;
  const header = 'id, product_id, body, date_written, asker_name, asker_email, reported, helpful \n';
  const stringGen = (num) => {
    return `${(startId + num)}, ${Math.floor(Math.random() * start)}, ${faker.lorem.sentence()}, ${faker.date.past().toISOString().split('T')[0]}, ${faker.name.firstName() + ' ' + faker.name.lastName()}, ${faker.internet.email()}, 0, ${Math.floor((Math.random() * 100))} \n`
  }
  try {
    await fs.writeFileSync(path, header, 'utf8', (err) => {
      if (err) throw err;
    });

    // this below will probably allow for all 10M to be created at same time with stream
    // let writeStream = await fs.createWriteStream(path); 

    // for (let i = 0; i < 1000000; i++) {
    //   writeStream.write(stringGen(i), 'utf8');
    // }
    // writeStream.on('finish', () => {
    //   const t1 = performance.now();
    //   const time = t1 - t0;
    //   console.log(`Done...in ${time}`);
    // });
    // writeStream.end();
  }
  catch {
    console.log(`error from catch`);
  }
};
leanQuestionGenerator(2);
