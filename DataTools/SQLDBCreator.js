import Converter from './CSVConverter';
// import sql, { DatabaseConnectionType } from 'slonik';

// query to copy sample csv into db
let type = 'questions';
const createQuestionsTable = `CREATE TABLE questions(
  id NOT NULL,
  product_id INT,
  body character varying(1000),
  date_written DATE,
  asker_name character varying(60),
  asker_email character varying(60),
  reported INT,
  helpful INT
)`;

const createAnswersTable = `CREATE TABLE answers(
  id NOT NULL,
  question_id INT,
  body character varying(1000),
  date_written DATE,
  answerer_name character varying(60),
  answerer_email character varying(60),
  reported INT,
  helpful INT
)`;

const createAnswersPhoto = `CREATE TABLE questions(
  id NOT NULL,
  answer_id INT,
  url character varying(2000)
)`
const questionsStubCopy = `COPY ${type} FROM '../CSV/questions_20.csv' DELIMITER ',' CSV HEADER;`