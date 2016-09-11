
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments(); //post ID
    table.string('users_id');//how do i make sure this is the same serialized ID from post table?
    table.string('posts_id');
    table.text('body');
    table.timestamp('UpdateTimestamp');
    table.timestamp('InsertTimestamp');
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('comments');
};
