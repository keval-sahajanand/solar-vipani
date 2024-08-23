const knex =require('../../common/knex.config')()

function userQueriesController() {
  return {
    async index(req,res){
      const userlogin = req.session.userlogin;
      const data=await knex('user_queries').orderBy('id','desc')
      return res.render('request',{data:data,userlogin:userlogin})
    },
    async userQueriesDelete(req,res){
      await knex('user_queries').where('id',parseInt(req.params.id)).delete()
      return res.redirect('/admin/user-queries')
    }
  }
}

module.exports=userQueriesController