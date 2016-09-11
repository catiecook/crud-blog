
//migrations still have not been finished
//need to figure out linking a column from one table to the other

exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments(); //post ID
    table.string('users_id');//how do i make sure this is the same serialized ID from post table?
    table.string('title');
    table.text('body');
    table.timestamp('UpdateTimestamp');
    table.timestamp('InsertTimestamp');
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('posts');
};
