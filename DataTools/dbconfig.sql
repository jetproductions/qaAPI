
DROP DATABASE IF EXISTS db_auto;
DROP SCHEMA IF EXISTS questions_answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS answers_photos;

CREATE DATABASE db_auto;
\c db_auto;
CREATE SCHEMA questions_answers;

CREATE TABLE questions_answers.questions(
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT,
  question_body VARCHAR(1000),
  question_date_written DATE,
  asker_name VARCHAR(60),
  asker_email VARCHAR(60),
  question_reported INT,
  question_helpful INT
);
CREATE TABLE questions_answers.answers(
  answer_id SERIAL PRIMARY KEY NOT NULL,
  question_id INT REFERENCES questions_answers.questions(id),
  answer_body VARCHAR(1000),
  answer_date_written DATE,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  answer_reported INT,
  answer_helpful INT
);
CREATE TABLE questions_answers.answers_photos (
  photo_id SERIAL PRIMARY KEY NOT NULL,
  answer_id INT REFERENCES questions_answers.answers(answer_id),
  url varchar(2000)
);
\copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions1.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions4.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions5.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions6.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions7.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions8.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions9.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions10.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions11.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions12.csv' WITH DELIMITER ',' CSV HEADER;

\copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos1.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos4.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos5.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos6.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos7.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos8.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos9.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos10.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos11.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos12.csv' WITH DELIMITER ',' CSV HEADER;

\copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers1.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers4.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers5.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers6.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers7.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers8.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers9.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers10.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers11.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions_answers.answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers12.csv' WITH DELIMITER ',' CSV HEADER;

CREATE INDEX product_index ON questions_answers.questions(product_id);