var knex = require('./knex');
var users = require('./users');


function returnAllPosts() {
  return knex('posts');
}

function getPostByID(id) {
  return knex('posts').select('id', 'title', 'body', 'user_id').where('id', id);
}

function getPostByTitle(title) {
  return knex('posts').select('id', 'title', 'body', 'user_id').where('title', title);
}

function getPostByUser(username) {
  return knex('posts').select('id', 'title', 'body', 'user_id').where('id', user_id);
}

function getPostTitle() {
  return knex('posts').select('title');
}

function newPost(title, body, user_id) {
  knex('posts').insert({title: title, body: body, user_id: user_id});
}

function deletePost(id) {
  return knex('posts').where('id', id).del();
}

function newComment(user_id, id, body) {
  return knex('comments').insert({user_id:user_id, id:id, body:body});
}

function getCommentUsername(user_id){
  return knex('users').innerJoin('comments', 'users.username').where('users.id', 'comments.user_id');
}

function deleteComment(id) {
    return knex('comments').where('id', id).del();
}


module.exports = {
  deleteComment: deleteComment,
  newComment: newComment,
  getCommentUsername: getCommentUsername,
  deletePost: deletePost,
  newPost: newPost,
  getPostTitle: getPostTitle,
  getPostByUser: getPostByUser,
  getPostByID: getPostByID,
  getPostByTitle: getPostByTitle,
  returnAllPosts: returnAllPosts
}
