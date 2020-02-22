const Sequelize = require('sequelize');
const { login, password } = require('../DataTools/dbcredentials');
const sequelize = new Sequelize('db_auto', login, password )