exports.up = function(knex) {
    return knex.schema.createTable('tags', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('note_id').unsigned().notNullable();
      table.foreign('note_id').references('notas.id').onDelete('CASCADE');;
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tags');
  };