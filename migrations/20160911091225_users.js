//migrations still have not been finished
//need to figure out linking a column from one table to the other

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments(); //ID
    table.string('username');
    table.string('password');
    table.string('full_name')
    table.integer('post_id').references('id').inTable('posts'); //how do i make sure this is the same serialized ID from post table?
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('users');
};

//table.integer(‘building_id’).references('id').inTable('building');
