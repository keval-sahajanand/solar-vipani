const knex =require('knex')
const {attachPaginate} = require('knex-paginate')
const config =require('../knexfile')

attachPaginate()
module.exports = () => {
  return knex(config.development); // Use the appropriate environment configuration ('development', 'production', etc.)
};