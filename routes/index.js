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


router.post('/login', passport.authenticate('local', {
  // users.authenticateUser(req.body.username, req.body.password)
       successRedirect: '/dashboard',
       failureRedirect: '/'
     })
    );
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
//******* LOGOUT ******
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//*********************

//***** DASHBOARD ******

router.get('/dashboard', function(req, res, next) {
  if(req.isAuthenticated()){
    console.log("Made it back to dashboard", req.user);
    query.returnPostTitleAndImageAndId()
    .then(function(titleAndImage){
      res.render('dashboard', {
        title: 'Tried That',
        preview: titleAndImage
      })
    })
  }
  else {
    res.redirect('/')
  }
});

router.post('/dashboard', function (req, res, next) {
  res.redirect('/dashboard')
});
//*********************

//***** POSTS ******
router.get('/post', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('post', {
      title: 'Tried That',
      subTitle: 'Create a Post',
      post: true
    });
  }
  else {
    res.redirect('/');
  }
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
  query.returnPostByID(req.params.id)
  // let comments = query.getComment()
  // Promise.all([post, comments])
    .then(function(singlePost, comments) {
      res.render('single-blog', {
        title: 'Tried That',
        blogs: singlePost
      })
    })
});
//return comments
// router.get('/single-blog/:id', function(req, res, next) {
//   query.getComment()
//   .then(function(comment){
//     res.render({
//       comments: comment
//     })
//   })
// });

router.post('/single-blog/:id', function(req, res, next) {
  if(req.isAuthenticated()){
    console.log("Catie")
    console.log("comment: ", req.body.commentBody)
    console.log("userid: ", req.user.id)
    console.log("postID: ", req.params.id)

    query.newComment(req.body.commentBody, req.user.id, req.params.id)
    .then(function(){
      res.redirect('/single-blog/'+ req.params.id)
    })
    .catch(function(err) {
      next(err)
    })
  }
  else {
    res.redirect('/')
  }
  });

module.exports = router;
