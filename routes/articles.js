const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await Article.findOne({ slug });
    res.render('articles/show', { article: article });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/edit/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await Article.findOne({ slug });
    res.render('articles/edit', { article: article });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
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
    console.log(await Article.findById(article.id));
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.log(err);
    res.render('articles/new', { article: article });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(400).redirect('/');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, markdown } = req.body;
  try {
    await Article.findByIdAndUpdate(id, {
      title,
      description,
      markdown,
    });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
