
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.text('body');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('comments');
};
