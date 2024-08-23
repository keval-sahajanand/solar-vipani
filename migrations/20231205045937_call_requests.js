/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("call_requests", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("businessId").references("business_list.id")
    .unsigned()
    .onDelete("CASCADE");
    table.string('name').nullable();
    table.string('phoneNumber').nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("call_requests");
};
