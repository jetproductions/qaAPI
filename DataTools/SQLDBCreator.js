// attempt to write a db creator using JS rather than SQL

const credentials = require('./dbcredentials');
const buildQuery = require('./buildQuery');
const sql = require('slonik');
const pg = require('pg');


const connectionStr = `postgres://${credentials.login}:${credentials.password}@postgres/5432`;
const pgClient = new pg.Client(connectionStr);
pgClient.connect();

const createDB = buildQuery;

const creator = pgClient.query(createDB);

pgClient.end();