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
    .catch(function(err){
      res.send(err, 'Yikes, that didn\'t work')

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
//********************

//***** DASHBOARD ******
router.get('/dashboard', function(req, res, next) {
  if(req.isAuthenticated()){
    console.log("Made it back to dashboard", req.user);
    query.returnPostTitleAndImageAndId()
    .then(function(titleAndImage){
      res.render('dashboard', {
        title: 'Tried That',
        preview: titleAndImage,
        loginUser: req.user.username
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

//***** MAKE A POST ******
router.get('/post', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('post', {
      title: 'Tried That',
      subTitle: 'Create a Post',
      loginUser: req.user.username,
      post: true
    });
  }
  else {
    res.redirect('/');
  }
});

router.post('/post', function(req, res, next) {
    if(req.body.title && req.body.body){
      query.newPost(req.body.title, req.body.body, req.body.image, req.user.id)
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

//***** VIEW BLOG STRING ******
router.get('/blog', function(req, res, next) {
  query.returnAllPosts()

  .then(function(allBlogs){
    // console.log(allBlogs)
    res.render('blog', {
      title: 'Tried That',
      loginUser: req.user.username,
      blog: true,
      blogs: allBlogs,
      id: req.params.id
    })
  })
  .catch(function(err) {
    next(err)
  })
});

//******* SINGLE BLOG PAGE *********
router.get('/single-blog/:id', function(req, res, next) {
  query.returnPostByID(req.params.id)
    .then(function(singlePost){
      return query.getCommentsAndUserName(req.params.id)
      .then(function(comments){
        console.log(singlePost)

          res.render('single-blog', {
            title: 'Tried That',
            blogs: singlePost,
            loginUser: req.user.username,
            id: req.params.id,
            comments: comments,
          })
        })
      })
      .catch(function(err) {
        next(err)
      })
});

router.post('/single-blog/:id', function(req, res, next) {
  if(req.isAuthenticated()){
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

//******* EDIT/UPDATE POST ********
router.get('/updatepost/:id', function(req, res, next){
  query.returnPostByID(req.params.id)
    .then(function(data){
      res.render('updatepost', {
        data: data,
        body: data[0].body,
        image: data[0].image,
        title: data[0].title,
        username: data[0].username,
        loginUser: req.user.username,
        id: req.params.id
      })
    })
    .catch(function(err) {
      next(err)
    })
});

router.post('/updatepost/:id/repost', function(req, res, next) {
  query.updatePost(req.params.id, req.body.body, req.body.title, req.body.image)
    .then(function() {
      res.redirect('/single-blog/'+ req.params.id)
    })

    .catch(function(err) {
      next(err)
    })
});

//*******DELETE POSTS AND COMMENTS ********
router.get('/single-blog/:id/remove', function(req, res, next){
  if(req.isAuthenticated()){
    query.getUserIdByPost(req.params.id).first()
    .then(function(poster_id) {
      console.log(req.user.id, 'equals', poster_id.user_id)
      if(req.user.id === poster_id.user_id) {
        return query.deletePost(req.params.id)
        .then(function(){
          return query.deleteCommentsWithPost(req.params.id)
          .then(function(){
            res.redirect('/blog')
          })
        })
      }
      else {
        res.redirect('/blog')
      }
    })
    .catch(function(err) {
      next(err)
    })
  }
  else {
    res.redirect('/')
  }
})

router.get('/single-blog/:id/remove-comment', function(req, res, next){
  if(req.isAuthenticated()){
    query.getUserIdByPost(req.params.id).first()
    .then(function(poster_id) {
      if(req.user.id === poster_id.user_id) {
        return query.getCommentID(req.params.id)
        .then(function(comment_id){
          return query.deleteComment(comment_id[0].id)
          .then(function(){
              res.redirect('/single-blog/'+ req.params.id)
          })
        })

      }
      else {
        res.redirect('/single-blog/' + req.params.id)
      }
    })
    .catch(function(err) {
      next(err)
    })
  }
  else {
    res.redirect('/')
  }
})



module.exports = router;
