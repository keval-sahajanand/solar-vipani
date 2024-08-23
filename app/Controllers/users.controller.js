const knex = require('../../common/knex.config')()

function userController() {
  return {
    async index(req, res) {
      const userlogin = req.session.userlogin;

      const data = await knex('users').where('type', 'subAdmin').orderBy('id', 'desc')
      return res.render('user', { data: data,userlogin:userlogin })
    },

    async subAdminEdit(req, res) {
      const isUser = await knex('users').where('email', req.body.email).first()
      if (isUser) {
        await knex('users').update({
          email: req.body.email,
          password: req.body.password,
          type: 'subAdmin',
          name: req.body.name,
          state: req.body.state,
          district: req.body.district,
        }).where('id', isUser.id)
      }
      return res.redirect('/admin/user')
    },

    async partnerList(req,res){
      const data = await knex('users').select("id","name").where('type', 'subAdmin').where('state',req.params.state).where('district',req.params.district)
      return res.json({
        res:true,
        data:data
      })
    }
  }
}

module.exports = userController