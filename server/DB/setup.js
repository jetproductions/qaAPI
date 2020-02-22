const { user, password } = require('../../DataTools/dbcredentials');
module.exports = {
  user,
  host: 'localhost',
  database: 'db_auto',
  schema: 'questions_answers',
  password,
  port: 5432,
}