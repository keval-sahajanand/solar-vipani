const knex = require('../../common/knex.config')()

function opinionController() {
  return {
    async index(req, res) {
      const userlogin = req.session.userlogin;

      const data = await knex('opinions').orderBy('id', 'desc')
      return res.render('opinion', { data: data,userlogin:userlogin })
    },

    async userQuoteDelete(req, res) {
      await knex('opinions').where('id', parseInt(req.params.id)).delete()
      return res.redirect('/admin/user-opinion')
    }
  }
}
module.exports = opinionController