var express = require('express');
var router = express.Router();
var passport = require('../passport');
var users = require('../database/users');
var query = require('../database/query');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Tried That',
    index: true
  })
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Tried That',
    login: true
  })
});

router.post('/login', function(req, res, next){
  users.authenticateUser(req.body.username, req.body.password)
    .then(function(authenticated){
       if(authenticated) {
         res.redirect('/dashboard');
       }
      else {
        res.send('Sorry, that is not a correct username and/or password')
      }
    })
});

router.get('/register', function(req, res, next){
  res.render('register', {
    title: 'Tried That',
    register: true
  })
});

router.post('/register', function (req, res, next) {
  if (req.body.username && req.body.password) {
    users.addUser(req.body.username, req.body.password)
    .then(function(){
      res.redirect('/dashboard');
    })
    .catch(function(){
      res.send('Yikes, that didn\'t work');
    });
  }
  else {
    req.send("you need to enter a username and password");
  }
});

//*********************

//***** DASHBOARD ******
router.get('/dashboard', function(req, res, next) {
  query.getPostTitle().select()
  .then(function(data){
    res.render('dashboard', {
      title: 'Tried That',
      dashboard: true,
      blogs: data
    })
  })
});

router.post('/dashboard', function (req, res, next) {
  // console.log("made it to dashboard");
  res.redirect('/dashboard')
});
//*********************

//***** POSTS ******
router.get('/post', function(req, res, next) {
  res.render('post', {
    title: 'Tried That',
    subTitle: 'Create a Post',
    post: true
  });
});

  router.post('/post', function(req, res, next) {
    query.newPost(req.body.title, req.body.body, req.body.user_id)
    .then(function(){
      res.redirect('/blog')
    })
    .catch(function(){
      res.send('Yikes, that didn\'t work');
    })

  });

//*********************

//***** BLOG STRING ******
router.get('/blog', function(req, res, next) {
  res.render('blog', {
    title: 'Tried That',
    blog: true
  })
});


router.get('/blog/:id', function(req, res, next) {
  res.render('blog', {
    title: 'Tried That',
    blog: true,
    id: req.body.id,
    postTitle: req.body.title,
    postAuthor: req.body.user_id
  });
});

module.exports = router;
