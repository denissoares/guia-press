const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//usando false ele só recria caso não exista a tabela
// User.sync({ force: false });

module.exports = User;
