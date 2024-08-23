const knex=require('../../common/knex.config')()

function businessReviewController() {
  return {
    async businessReviewList(req,res){
      const userlogin = req.session.userlogin;

      const data=await knex('business_reviews').orderBy('id','desc')
      return res.render('business-reviews',{data:data,userlogin:userlogin})
  
    },


    async businessReviewDelete(req,res){
      await knex('business_reviews').where('id',parseInt(req.params.id)).delete()
      return res.redirect('/admin/business-reviews')
    }
  }

}
module.exports=businessReviewController