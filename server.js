const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6890;
const articlesRouter = require('./routes/articles');

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/articles', articlesRouter);

app.get('/', (req, res) => {
  const articles = [
    {
      title: 'blog 1',
      createdAt: new Date(),
      description: 'description 1',
    },
    {
      title: 'blog 2',
      createdAt: new Date(),
      description: 'description 2',
    },
  ];
  res.render('articles/index', { articles: articles });
});

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
