const { user, password } = require('../../DataTools/dbcredentials');
module.exports = {
  user,
  host: 'localhost',
  database: 'db_auto',
  password,
  port: 5432,
  max: 100
}