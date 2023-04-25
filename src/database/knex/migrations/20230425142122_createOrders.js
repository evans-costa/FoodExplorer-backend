export function up(knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.string("status");
    table.string("total");
    table.string("payment_method");

    table.timestamp("created_at").default(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("orders");
}
