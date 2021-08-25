const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.render('articles/show', { article: article });
});
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.render('articles/edit', { article: article });
});
router.post('/', async (req, res) => {
  const { title, description, markdown } = req.body;
  let article = new Article({
    title,
    description,
    markdown,
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (err) {
    console.log(err);
    res.render('articles/new', { article: article });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    res.status(400).redirect('/');
  }
  res.redirect('/');
});
module.exports = router;
