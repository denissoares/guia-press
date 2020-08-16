const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

//Uma categoriatem muitos artigos 1-P-N
Category.hasMany(Article);
// Um artigo pertence a uma categoria 1-P-1
Article.belongsTo(Category);

// Executar apenas uma vez para criação da tabela
// Article.sync({ force: true });

module.exports = Article;
