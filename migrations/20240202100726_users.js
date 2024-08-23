/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned().primary();
    table.string("email").nullable();
    table.text('password');
    table.string("type").nullable();
    table.string("state").nullable();
    table.string("district").nullable();
    table.string("name").nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
