export function up(knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id");
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.text("name");
  });
}

export function down(knex) {
  return knex.schema.dropTable("ingredients");
}
