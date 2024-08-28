
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('business_list', table => {
    table.string('score').defaultTo(0);
    table.string('isVisible').defaultTo("visible");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('business_list', table => {
    table.dropColumn('score');
    table.dropColumn('isVisible');

  })
};

