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

//*********************

//***** LOGIN ******

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
//*********************

//***** REGISTER ******

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
  query.returnPostTitleAndImageAndId()
  .then(function(titleAndImage){
    res.render('dashboard', {
    title: 'Tried That',
    blog: true,
    preview: titleAndImage
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
  if(req.body.title && req.body.body){
    query.newPost(req.body.title, req.body.body, req.body.image, req.body.user_id)
      .then(function(){
        res.redirect('/blog');
      })
      .catch(function(){
        res.send('Yikes, that didn\'t work');
      })
  }
  else {
    req.send("You need to enter a title and body for the post");
  }
});

//*********************

//***** BLOG STRING ******
router.get('/blog', function(req, res, next) {
  query.returnAllPosts()
  .then(function(allBlogs){
    res.render('blog', {
    title: 'Tried That',
    blog: true,
    blogs: allBlogs
    })
  })
});


//******* SINGLE BLOG PAGE *********

router.get('/single-blog/:id', function(req, res, next) {
  console.log('trying to reload comments')
  query.returnPostByID(req.params.id)
  .then(function(singlePost) {
    res.render('single-blog', {
      title: 'Tried That',
      blogs: singlePost
    })
  })
});
//return comments
router.get('/single-blog/:id', function(req, res, next) {
  query.getComment()
  .then(function(comment){
    res.render({comment: comment})
  })
});

router.post('/single-blog/:id', function(req, res, next) {
    console.log('Creating Comment')
    console.log(req.user);

    query.newComment(req.body.user_id, req.body.body)
    .then(function(){
      console.log('inside creating Comment')
      res.redirect('/single-blog/:id')
    }).catch(function(err){
      next(err)
    })
  });

// *********************

//***** nav on all pages ******
// router.get('/:all', function(req, res, next) {
//   res.render('/:all', {
//     username: query.getUserName()
//   })
// })

module.exports = router;
