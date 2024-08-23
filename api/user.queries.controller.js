const knex=require('../common/knex.config')();

function userQueriesController() {
  
  return {
    async userQueryAdd(req,res){
      const {name,email,phoneNumber,message,type}=req.body

      if( message === '' ){
        return res.json({
          res:false,
          message:'All parameters are required!'
        })
      }

      await knex('user_queries').insert({
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        message:message,
        type:type
      })

      return res.json({
        res:true,
        message:'Successfully your queries add!'
      })
    }
  }

}
module.exports=userQueriesController