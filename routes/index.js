var express = require('express');
var router = express.Router();
var passport = require('../passport');
var users = require('../users')

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
    return;
  }
  res.render('index', {
    Title: 'Tried That',
    index: true
  });
});

router.post('/register', function (req, res, next) {
  var success = users.add(req.body.username, req.body.password);
  if (!success)
  {
    next(new Error('User could not be created.'));
    return;
  }
  res.redirect('/');
});
//*********************

//***** DASHBOARD ******
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {
    title: 'Tried That',
    dashboard: true
  });
});

router.post('/dashboard', function (req, res, next) {
  console.log("made it to dashboard");
  res.redirect('/dashboard');
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
//*********************

//***** BLOG STRING ******
router.get('/blog', function(req, res, next) {
  res.render('blog', {
    title: 'Tried That',
    blog: true
  });
});





module.exports = router;
