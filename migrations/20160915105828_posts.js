exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments(); //post ID
    table.string('title');
    table.text('body');
    table.string('image');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);

  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('posts');
};
