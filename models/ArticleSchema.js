var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema ({
  title: {
    type: String,
    require: true,
    unique: true,
    dropDups: true,
  },
  URL: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
  }
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
