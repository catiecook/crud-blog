
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.text('body');
    table.integer('user_id').references('id').inTable('users');
    table.integer('post_id').references('id').inTable('posts');
    table.timestamps(true);

  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('comments');
};
