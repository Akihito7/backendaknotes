exports.up = function(knex) {
    return knex.schema.createTable('notas', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('notas');
  };