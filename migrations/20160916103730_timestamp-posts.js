exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dateTime('created_at').nullable();
    table.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('posts');
};
