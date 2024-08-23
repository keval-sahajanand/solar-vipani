/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sitebookimages", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("siteBookId").references("bookings.id")
    .unsigned()
    .onDelete("CASCADE");
    table.string("image").nullable();
    table.string('type').nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sitebookimages");
};
