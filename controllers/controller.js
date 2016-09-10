var express = require ('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_dzqdjbpp:m4q2mgf93oiqlk2h0os6ocgq3s@ds139655.mlab.com:39655/heroku_dzqdjbpp');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

var Article = require('../models/articleSchema.js');

// Main Route
router.get('/', function(req, res){
  res.send('./public/index.html');
})

// Route to get all saved articles
router.get('/api/saved', function(req, res) {

  Article.find({}).sort({date:-1})
    .exec(function(err, doc){
      if(err){
        throw err;
      }
      else {
        res.send(doc);
      }
    });
});

// Route to add an article to saved list
router.post('/api/saved', function(req, res){
  var newArticle = new Article(req.body);
  Article.create({title: req.body.title, URL: req.body.URL, date: req.body.date});
});

// Route to delete an article from saved list
app.delete('/api/saved/:id', function(req, res){
  Article.remove({_id: req.params.id}, function(err,doc){
    if (err) throw err;
    res.send(doc);
  });
});

module.exports = router;
