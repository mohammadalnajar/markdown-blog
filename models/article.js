const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM().window;
const DOMPurify = createDOMPurify(window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      replacement: '_',
    });
    if (this.markdown) {
      this.sanitizedHTML = DOMPurify.sanitize(marked(this.markdown));
    }
  }
  next();
});
module.exports = mongoose.model('Article', articleSchema);
