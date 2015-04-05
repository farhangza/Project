var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var List = require('../models/list');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Already Taken! Try again!"});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//Take care of movies (sent from java-script)
router.post('/movie', function(req, res) {
  //Available variables
  var movie_data = [];
  var movie_id = '';
  //Search using title
    Movie.find({title: req.body.title}, {title: 1, year: 1, picture: 1, _id: 1, info: 1},function(err, data){
      if(err){
          res.json({message: "error"});
      }
      movie_data.push(data);
      movie_id = data[0]._id;
      // All comments with same movie ID
      Comment.find({movie_id: movie_id}, {movie_id:1, user_id:1, text: 1, visible: 1, _id: 1}, function(err, data){
        if(err){
          res.json({message: "error"});
        }
        movie_data.push(data);
        res.json(movie_data);
      });
  });

});

router.post('/movie/comment', function(req, res){
  var movie_id = req.body.movie_id;
  var user_id = req.body.user_id;
  var text = req.body.text;
  var visible = req.body.visible;
  var comment = new Comment();
  comment.movie_id = movie_id;
  comment.user_id = user_id;
  comment.text = text;
  comment.visible = visible;
  comment.save(function(err){
    if(err){
      res.json({message: "fail"});
    }
    console.log("success");
    res.json({message: "done"});
  });
});
// Movie data bases on id
router.post('/movie/id', function(req, res){

  var movie_data = {};
  var movie_id = req.body.movie_id;
  Movie.findOne({_id: movie_id}, function(err,obj) {
    if(err){
      res.json({message: "fail"});
    }
    movie_data.title = obj.title;
    movie_data.year = obj.year;
    movie_data._id = obj._id;
    console.log(movie_data);
    res.json(movie_data);
  });
});
// Route for user ID
router.post('/account',function(req, res){
  var user_id = [];
  var name = req.body.name;
  Account.findOne({username: name}, function(err,obj) {
    if(err){
      res.json({message: "fail"});
    }
    user_id.push(obj._id) ;
    res.json(user_id);
  });
});
// List of favourite movie for a specific user
router.post('/Favourites', function(req, res){
  var list_data = [];
  var user_id = req.body.user_id;
  List.findOne({user_id: user_id}, function(err,obj) {
    if(err){
      res.json({message: "List ID failed"});
    }
    for(var i=0; i<obj.list.length; i++){
      list_data.push(obj.list[i]);
    }
    console.log("List data: "+list_data);
    res.json(list_data);
  });
});
router.post('/list/id', function(req, res){
  var id = req.body.id;
  List.findOne({user_id: id}, function(error, obj) {
    if(error){
      res.json({message: "error"});
    }
    if(obj == null){
      res.json({message: null});
    }else{
      console.log(obj);
      res.json({message: obj});
    }

  });
});

router.post('/Favourites/add', function(req, res){
  var user_id = req.body.id;
  var movie_id = req.body.movie_id;
  var listobj = new List();
  listobj.user_id = user_id;
  listobj.list.push({movie_id: movie_id});
  listobj.save(function(err){
    if(err){
      console.log("failed");
      res.json({message: "adding failed"});
    }
    console.log("success");
    res.json({message: "adding successful"});
  });
});
router.post('/Favourites/add/id', function(req, res){
  console.log(req.body.id);
  console.log(req.body.movie_id);

  List.findByIdAndUpdate({_id:req.body.id},{ $push: { list: {movie_id: req.body.movie_id} }}, {safe: true, upsert: true},function(error, data){
      if(error){
        res.json({message: "error"})
      }
      res.json(data)
      console.log("from update"+data);
    });
});

// Delete movies from list
router.post('/Favourites/delete/id', function(req, res){
  var list_id = req.body.id;
  var movie_id = req.body.movie_id;
  console.log(list_id);
  console.log(movie_id);
  List.update({_id: list_id}, {$pull: {list: {movie_id: movie_id}}}, {safe: true}, function(err, obj){
    if(err){
      res.json({message: "err"});
    }
    res.json({message: obj});
  });
});
// list all the comments made by the user
router.post('/comment/list/user', function(req, res){
  var user_id = req.body.id;
  Comment.find({user_id: user_id},{_id: 1, text: 1, visible: 1}, function (err, data){
    if(err){
      res.json({message: "err"});
    }
    res.json(data);
  });
});
// delete comment based on ID
router.post('/comment/delete/id', function(req, res){
  var comment_id = req.body.comment_id;
  Comment.remove({_id: comment_id}, function(err){
    if(err){
      res.json({message:"err"});
    }
    res.json({message: "deleted"});
  });
});
module.exports = router;
