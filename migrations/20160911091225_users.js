
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username');
    table.string('password');
    table.int('post_id'); //how do i make sure this is the same serialized ID from post table?
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('users');
};
