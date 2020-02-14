
CREATE DATABASE db_auto;
USE db_auto;
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
COPY questions FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/questions.csv' WITH DELIMITER ',' CSV HEADER;
COPY answers_photos FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/answers_photos.csv' WITH DELIMITER ',' CSV HEADER;
COPY answers FROM '~et/documents/hack-rxr-07/sdc/qaapi/csv/answers.csv' WITH DELIMITER ',' CSV HEADER;
