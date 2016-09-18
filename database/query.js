var knex = require('./knex');
var users = require('./users');

function returnAllPosts() {
  return knex('posts').select('posts.id', 'title', 'body', 'image', 'user_id', 'username').join('users', 'posts.user_id', 'users.id').orderBy('posts.id', 'desc');
}

function returnPostByID(post_id) {
  return knex('posts').select('posts.id', 'title', 'body', 'image', 'user_id', 'username').join('users', 'posts.user_id', 'users.id').where('posts.id', post_id);
}

function returnPostTitleAndImageAndId() {
  return knex('posts').select('id', 'title', 'image').orderBy('id', 'desc');
}

function newPost(title, body, image, user_id) {
  return knex('posts').insert({'title': title, 'body': body, 'image': image, 'user_id': user_id});
}

function deletePost(id) {
  return knex('posts').where('id', id).del();
}

//COMMENTS
function getCommentsAndUserName(post_id) {
  return knex('comments').select('body', 'user_id', 'username').join('users', 'user_id', 'users.id').where('post_id', post_id)
}

function newComment(body, user_id, post_id) {
  return knex('comments').insert({user_id:user_id, body:body, post_id: post_id});
}

function getCommentUsername(user_id){
  return knex('users').join('comments', 'comments.user_id', 'users.id').select('username');
}

function getCommentID(post_id){
  return knex('comments').select('id').where('post_id', post_id)
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
function deleteComment(comment_id) {
    return knex('comments').where('id', comment_id).del();
}

function deleteCommentsWithPost(post_id) {
  return knex('comments').where('post_id', post_id).del();
}

function deletePost(id) {
  return knex('posts').where('id', id).del();
}

function updatePost(post_id, newBody, newTitle, newImage) {
  return knex('posts').where('id', post_id).update({'title': newTitle, 'body': newBody, 'image': newImage})
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
  getCommentsAndUserName: getCommentsAndUserName,
  deletePost: deletePost,
  deleteCommentsWithPost: deleteCommentsWithPost,
  updatePost: updatePost,
  getCommentID: getCommentID
}
