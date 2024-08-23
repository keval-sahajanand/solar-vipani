const knex = require('../../common/knex.config')()

function callRequestController() {
  return {
    async index(req, res) {
      const userlogin = req.session.userlogin;
      // await knex('call_requests').delete()

      const callRequest=await knex('call_requests')
      
      const finaldata=[]

      await Promise.all(callRequest.map(async (a)=>{
          const business=await knex('business_list').where('id',parseInt(a.businessId)).first()
          
          const b={
            id:a.id,
            name:business.name,
            callUserName:a.name,
            phoneNumber:a.phoneNumber,
            businessId:a.businessId
          } 
          await finaldata.push(b)
      }))

      return res.render('call-request',{data:finaldata,userlogin:userlogin})

    },
    async callRequestDelete(req,res){
      await knex('call_requests').where('id',parseInt(req.params.id)).delete()
      return res.redirect('/admin/call-request')
    }
  }
}
module.exports = callRequestController