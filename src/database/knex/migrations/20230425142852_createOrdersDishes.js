export function up(knex) {
  return knex.schema.createTable("orders_dishes", (table) => {
    table.increments("id");
    table.integer("order_id").references("id").inTable("orders");
    table.integer("dish_id").references("id").inTable("dishes");
    table.integer("quantity");

    table.timestamp("created_at").default(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("ingredients");
}
