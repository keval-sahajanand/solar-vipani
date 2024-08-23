/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("business_reviews", (table) => {
    table.increments("id").unsigned().primary();
    table.integer('businessId').nullable();
    table.string('businessName').nullable();
    table.string('star').nullable();
    table.string('reviewTitle').nullable();
    table.text('reviewDescription');
    table.string('displayName').nullable();
    table.string('pincode').nullable();
    table.string('dateOfInstallation').nullable();
    table.string('sizeOfSystem').nullable();
    table.string('solarPanelBrand').nullable();
    table.string('inverterBrand').nullable();
    table.text('comment');
    table.string('mobileNumber').nullable();
    table.string("createdAt").defaultTo(knex.fn.now());
    table.string("updatedAt").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("business_reviews");
};
