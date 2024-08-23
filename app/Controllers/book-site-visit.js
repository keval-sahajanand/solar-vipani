const knex=require("../../common/knex.config")();

function bookSiteVisitController() {
  return {
    async index(req,res){
      const userlogin = req.session.userlogin;
      const data=await knex("bookings").orderBy('id','desc')
      return res.render('book-site-visit',{data:data,userlogin:userlogin})
    },

    async deleteBookSiteVisit(req,res){
      const data=await knex('bookings').where('id',parseInt(req.params.id)).first()
      if(data){
        await knex('bookings').where('id',data.id).delete()
      }
      return res.redirect('/admin/book-site-visit')
    },

    async bookSiteVisitImage(req,res){
      const userlogin = req.session.userlogin;
      const data=await knex('sitebookimages').where('siteBookId',parseInt(req.params.id))


      return res.render('image-view',{data:data,userlogin:userlogin})
    }
  }
}
module.exports=bookSiteVisitController