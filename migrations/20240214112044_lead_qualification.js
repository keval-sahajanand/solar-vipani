/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lead_qualification", (table) => {
    table.increments("id").unsigned().primary();
    table.string('systemSize').nullable();
    table.string('type').nullable();
    table.string('city').nullable();
    table.string('name').nullable();
    table.string('email').nullable();
    table.string('phoneNumber').nullable();
    table.string('state').nullable();
    table.string('svStatus').nullable();  
    table.string('pStatus').nullable();
    table.string('partnerState').nullable();
    table.string('partnerDistrict').nullable();
    table.integer("partnerId").nullable();
    table.text("notes");
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lead_qualification");
};
