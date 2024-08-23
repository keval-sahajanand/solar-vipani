/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("blogs", (table) => {
    table.increments("id").unsigned().primary();
    table.string("title").nullable();
    table.text('description');
    table.string("url").nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("blogs");
};
