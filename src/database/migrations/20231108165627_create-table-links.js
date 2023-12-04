exports.up = function(knex) {
    return knex.schema.createTable('links', function(table) {
      table.increments('id').primary();
      table.string('url').notNullable();
      table.integer('note_id').unsigned().notNullable();
      table.foreign('note_id').references('notas.id').onDelete('CASCADE');;
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('links');
  };