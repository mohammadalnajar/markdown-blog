const express = require('express');
const app = express();
const PORT = process.env.PORT || 6890;
const articlesRouter = require('./routes/articles');

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
