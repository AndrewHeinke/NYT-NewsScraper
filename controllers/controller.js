var express = require ('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_442gngff:dvpcksk5n34h4umhr9p5g5n3bo@ds029106.mlab.com:29106/heroku_442gngff');
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
