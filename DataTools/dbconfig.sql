
DROP DATABASE IF EXISTS db_auto;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS answers_photos;

CREATE DATABASE db_auto;
\c db_auto;
CREATE TABLE questions(
  id INT PRIMARY KEY,
  product_id INT,
  body VARCHAR(1000),
  date_written DATE,
  asker_name VARCHAR(60),
  asker_email VARCHAR(60),
  reported INT,
  helpful INT
);
CREATE TABLE answers(
  id INT PRIMARY KEY,
  question_id INT,
  body VARCHAR(1000),
  date_written DATE,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  reported INT,
  helpful INT
);
CREATE TABLE answers_photos (
  id INT PRIMARY KEY,
  answer_id INT,
  url varchar(2000)
);
\copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions1.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions2.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions3.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions4.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions5.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions6.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions7.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions8.csv' WITH DELIMITER ',' CSV HEADER;
-- \copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions9.csv' WITH DELIMITER ',' CSV HEADER;
\copy questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Questions/questions10.csv' WITH DELIMITER ',' CSV HEADER;


\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos1.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos2.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos3.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos4.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos5.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos6.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos7.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos8.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos9.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/AnswerPhotos/answers_photos10.csv' WITH DELIMITER ',' CSV HEADER;

\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers1.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers2.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers3.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers4.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers5.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers6.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers7.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers8.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers9.csv' WITH DELIMITER ',' CSV HEADER;
\copy answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/Answers/answers10.csv' WITH DELIMITER ',' CSV HEADER;
