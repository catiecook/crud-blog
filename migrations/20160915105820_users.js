exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments(); //ID
    table.string('username');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('users');
};
