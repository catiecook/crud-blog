var bcrypt = require("bcrypt");
var query = require('./query.js');
var environment = 'development';
var config = require('../knexfile')[environment];
var knex = require('knex')(config);

function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

function findUser(username) {
  return knex('users').select('username').where('username', username);
}

function authenticateUser(username, password) {

  return knex('users').where('username', username).first()
    .then(function(user){
      if(user) {
        if(password){
          return  new Promise(function(resolve, reject){
            bcrypt.compare(password, user.password, function(err, result){
              if(err){
                reject(err)
              }
              else { resolve(result) }
            })
          })
        }
      }
      else {
        return false
      }
    })
  }

function addUser(username, password) {
  return knex('users').insert({username: username, password: hashPassword(password)})
}


module.exports = {
  find: findUser,
  authenticateUser: authenticateUser,
  addUser: addUser
}
