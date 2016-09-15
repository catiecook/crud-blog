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

function authenticateUser(username) {
  return knex('users').where('username', username).first()
  }

function authenticatePassword(userData, password, func) {
  bcrypt.compare(password, userData.password, func);
}

function addUser(username, password) {
  return knex('users').insert({username: username, password: hashPassword(password)})
}


module.exports = {
  find: findUser,
  authenticateUser: authenticateUser,
  authenticatePassword: authenticatePassword,
  addUser: addUser
}
