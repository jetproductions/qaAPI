
DROP DATABASE IF EXISTS db_auto;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS answers_photos;

CREATE DATABASE db_auto;
\c db_auto;
CREATE TABLE questions(
  id int NOT NULL,
  product_id int,
  body varchar(1000),
  date_written DATE,
  asker_name varchar(60),
  asker_email varchar(60),
  reported INT,
  helpful INT
);
CREATE TABLE answers(
  id int NOT NULL,
  question_id INT,
  body character varying(1000),
  date_written DATE,
  answerer_name character varying(60),
  answerer_email character varying(60),
  reported INT,
  helpful INT
);
CREATE TABLE answers_photos (
  id int NOT NULL,
  answer_id INT,
  url varchar(2000)
);
\copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers.csv' WITH DELIMITER ',' CSV HEADER;
