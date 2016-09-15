var passport = require("passport")
var Local = require("passport-local")
var users = require("./database/users")

passport.use(new Local(function (username, password, done)
{
  users.authenticateUser(username)

  .then(function(userData){
    console.log("USER DATA FROM PASSPORT", userData)
    if(userData){
      users.authenticatePassword(userData, password, function(err, res){
        if(res){
          done(null, userData)
        }
        else {
          done(null, false)
        }
      }) //check if the password is correct
    }
    else {
      done(null, false)
    }
  })
  .catch(function(err){
    done(err)
  })
}))

passport.serializeUser(function (user, done)
{
  done(null, user.username)
})

passport.deserializeUser(function (username, done)
{
  users.authenticateUser(username)
  .then(function(userData){
    done(null, userData)
  })
  .catch(function(err){
    done(err)
  })
});

module.exports = passport
