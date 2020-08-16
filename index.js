const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//View engine
app.set('view engine', 'ejs');

//Sessions
// prettier-ignore
app.use(session({
  secret: 'huahahua', //colocar uma palavra aleatória para aumentar a segurança da session, o maxAge é em milessegundos
  cookie: {
    maxAge: 30000
  }
}
));

//Static
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database

connection
  .authenticate()
  .then(() => {
    console.log('Conexão efetuada com sucesso!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', usersController);

app.get('/', (req, res) => {
  Article.findAll({ order: [['id', 'DESC']], limit: 4 }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render('index', { articles: articles, categories: categories });
    });
  });
});

app.get('/:slug', (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll({ order: [['title', 'ASC']] }).then((categories) => {
          res.render('articles', { article: article, categories: categories });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.redirect('/');
    });
});

// prettier-ignore
app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }]
  }).then((category) => {
        if (category != undefined) {
          Category.findAll().then((categories) => {
            res.render('index', {articles: category.articles, categories: categories});
          });
        } else {
          res.redirect('/');
        }
        }).catch(err => {
          res.redirect('/');
        })
        
  })

app.listen(3000, (err) => {
  if (!err) {
    console.log('O Servidor está rodando');
  } else {
    console.log('Erro ao inicializar o servidor');
  }
});
