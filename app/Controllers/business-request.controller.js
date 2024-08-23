const knex=require('../../common/knex.config')()

function businessRequestController() {
  return {
    async businessRequestList(req,res){
      const userlogin = req.session.userlogin;

      const data=await knex('business_requests').orderBy('id','desc')
      return res.render('business-request',{data:data,userlogin:userlogin})
  
    },

    async businessRequestEdit(req,res){
      if(req.body.isApprove === 'Approved'){
        await knex('business_requests').update({
          isApprove:'Approved'
        }).where('id',parseInt(req.body.id))

        await knex('business_list').insert({
          name: req.body.name,
          address: req.body.address,
          mapPin: req.body.mapPin,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email?req.body.email:null,
          website: req.body.website,
          gstnNumber: req.body.gstnNumber?req.body.gstnNumber:null,
          state: req.body.state,
          district: req.body.district
        });    
      }else{
        await knex('business_requests').update({
          isApprove:'Rejected'
        }).where('id',parseInt(req.body.id))
      }
      return res.redirect('/admin/business-request')
    },

    async businessRequestDelete(req,res){
      await knex('business_requests').where('id',parseInt(req.params.id)).delete()
      return res.redirect('/admin/business-request')
    }
  }

}
module.exports=businessRequestController