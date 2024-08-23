/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bookings", (table) => {
    table.increments("id").unsigned().primary();
    table.string('name').nullable();
    table.string('phoneNumber').nullable();
    table.string('email').nullable();
    table.text('address');
    table.string('buildingType').nullable();
    table.string('roofType').nullable();
    table.string('roofAge').nullable();
    table.string('queOneDate').nullable();  
    table.string('queOneTime').nullable();
    table.string('queTwoDate').nullable();
    table.string('queTwoTime').nullable();
    table.text("comment");
    table.string("image").nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bookings");
};
