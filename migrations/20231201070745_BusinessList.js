/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("business_list",(table)=>{
    table.increments("id").unsigned().primary();
    table.string('name').nullable();
    table.string('address').nullable();
    table.string('mapPin').nullable();
    table.string('phoneNumber').nullable();
    table.string('email').nullable();
    table.string('website').nullable();
    table.string('gstnNumber').nullable();
    table.string('state').nullable();
    table.string('district').nullable();
    table.string('usefull').nullable();
    table.string('unUsefull').nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("business_list");
};
