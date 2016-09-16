
exports.up = function(knex, Promise) {
  return knex.schema.table('comments', function(table){
    table.integer('post_id').references('id').inTable('posts')
    table.dateTime('created_at').nullable();
    table.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('comments');
};
