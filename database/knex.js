var pg = require('pg'):
var environment = 'development';
var config = require('../knexfile.js')[environment];

//pull in database
pg.default.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client){
  if (err) throw err;
  console.log('Connected to postgres, gathering schemas...');

  client
    .query('SELECT table_schema, table_name FROM information_schema.tables;')
    .on('row', function(row){
    console.log(JSON.stringfy(row));
    });
});
