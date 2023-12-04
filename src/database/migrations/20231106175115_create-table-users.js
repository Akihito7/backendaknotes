exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email");
    table.text("password").notNullable();
    table.text("imagem");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable("users");