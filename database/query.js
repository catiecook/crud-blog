var knex = require('./knex');
var users = require('./users');

function returnAllPosts() {
  return knex('posts').select('id', 'title', 'body', 'image', 'user_id').orderBy('id', 'desc');
}

function returnPostByID(id) {
  return knex('posts').select('id', 'title', 'body', 'image', 'user_id').where('id', id);
}

function returnPostTitleAndImageAndId() {
  return knex('posts').select('id', 'title', 'image').orderBy('id', 'desc');
}

function newPost(title, body, image, user_id) {
  return knex('posts').insert({title: title, body: body, image: image, user_id: user_id});
}

function deletePost(id) {
  return knex('posts').where('id', id).del();
}

//COMMENTS
function getComment() {
  return knex('comments').select('id', 'body', 'user_id', 'post_id')
}

function newComment(body, user_id, post_id) {
  return knex('comments').insert({user_id:user_id, body:body, post_id: post_id});
}

function getCommentUsername(user_id){
  return knex('users').innerJoin('comments', 'users.username').where('users.id', 'comments.user_id');
}

function getUserName(){
  return knex('users').select('username');
}

function getUserID() {
  return knex('users').select('id');
}

function getUserIdByPost(postID){
  return knex('posts').select('user_id').where('id', postID);
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
  returnPostByID: returnPostByID,
  returnPostTitleAndImageAndId: returnPostTitleAndImageAndId,
  returnAllPosts: returnAllPosts,
  getUserName: getUserName,
  getUserIdByPost: getUserIdByPost,
  getComment: getComment
}
