
exports.up = function(knex) {
return knex.schema
  .createTable('users', function(table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
  })
  .createTable('hobbies', function(table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('description', 255).notNullable();
    table.integer('userId').notNullable();
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('hobbies').dropTable('users');
};