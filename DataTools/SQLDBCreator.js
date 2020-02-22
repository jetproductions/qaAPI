// attempt to write a db creator using JS rather than SQL

const credentials = require('./dbcredentials');
const buildQuery = require('./buildQuery');
const pg = require('pg');

const createDB = async () => {
  const connectionStr = `postgres://${credentials.login}:${credentials.password}@postgres/5432`;
  const pgClient = new pg.Client(connectionStr);
  await pgClient.connect();
  await pgClient.query(buildQuery);
  await pgClient.end();
}

createDB();