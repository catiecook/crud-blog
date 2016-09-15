var passport = require("passport")
var Local = require("passport-local")
var users = require("./database/users")

passport.use(new Local(function (username, password, done)
{
  var verified = users.authenticateUsers(username, password)
  if (!verified)
  {
    done(null, false)
  }
  var user = users.find(username)
  done(null, user)
}))

passport.serializeUser(function (user, done)
{
  done(null, user.username)
})

passport.deserializeUser(function (username, done)
{
  var user = users.find(username)
  done(null, user)
})

module.exports = passport
