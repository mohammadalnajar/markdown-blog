const express = require('express');
const app = express();
const Article = require('./models/article');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6890;
const articlesRouter = require('./routes/articles');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/articles', articlesRouter);

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
});

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
