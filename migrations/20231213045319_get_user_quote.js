/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("get_user_quote", (table) => {
    table.increments("id").unsigned().primary();
    table.string('systemSize').nullable();
    table.string('type').nullable();
    table.string('city').nullable();
    table.string('name').nullable();
    table.string('email').nullable();
    table.string('phoneNumber').nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("get_user_quote");
};
