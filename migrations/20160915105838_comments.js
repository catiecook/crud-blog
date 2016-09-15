
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments(); //post ID
    table.text('body');
    table.integer('user_id').references('id').inTable('users');

    table.timestamp('created');
    table.timestamp('updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('comments');
};
