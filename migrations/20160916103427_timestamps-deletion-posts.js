exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dropColumn('created');
    table.dropColumn('updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('posts');
};
