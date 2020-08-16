const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress', 'root', '000000', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
});

module.exports = connection;
