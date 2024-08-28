const knex = require('../../common/knex.config')();


function businessListController() {
  return {
    async index(req, res) {
      const userlogin = req.session.userlogin;
      const data = await knex('business_list').select("id","name","phoneNumber","email","website","gstnNumber","usefull","unUsefull").where("state","Gujarat")

      // const data = await knex('business_list').where("state","Gujarat")
      return res.render('business-list', { data: data ,userlogin:userlogin,state:"Gujarat"})
    },

    async newIndex(req, res) {
      const userlogin = req.session.userlogin;
      // const datas = await knex('business_list').where("state",req.params.state)
    //  for (const item of datas) {
    //   const updatedSlug = item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); 
    //   // const updatedName = item.name.replace(/\s+/g, ' ');
    //   await knex('business_list').update({ slug: updatedSlug}).where('id', item.id);
    //   }
      const data = await knex('business_list').select("id","name","phoneNumber","email","website","gstnNumber","usefull","unUsefull").where("state",req.params.state)
    // console.log(data[data.length -1]);

      return res.render('business-list', { data: data, userlogin: userlogin,state:req.params.state })
    },

    async newBusinessCreate(req, res) {
      await knex('business_list').insert({
        name: req.body.name,
        address: req.body.address,
        mapPin: req.body.mapPin,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email ? req.body.email : null,
        website: req.body.website ? req.body.website : null,
        gstnNumber: req.body.gstnNumber ? req.body.gstnNumber : null,
        state: req.body.state,
        district: req.body.district,
        note:req.body.note,
        slug:req.body.slug,
        districtNew:req.body.districtNew,
      });
      return res.redirect('/admin/business')
    },

    async businessEditIndex(req,res){
      const data = await knex('business_list').where("id",req.params.id).first()
      const userlogin = req.session.userlogin;
      return res.render("business-edit",{data: data, userlogin: userlogin})
    },

    async businessEdit(req, res) {
      const data = await knex('business_list').where('id', parseInt(req.body.id)).first()
      let isSubAdminCreate = data.isSubAdmin
      if (req.body.isSubAdmin) {
        isSubAdminCreate = true;
        const isSubAdmin = await knex("users").where('email', req.body.phoneNumber).first();
        if (!isSubAdmin) {
          await knex("users").insert({
            name: req.body.name,
            state: req.body.state,
            district: req.body.district,
            districtNew:req.body.districtNew,
            email: req.body.phoneNumber,
            notes:req.body.notes,
            type:'subAdmin',
            score:req.body.score,
            isVisible:req.body.isVisible
          })
        }
      }

      if (!req.body.isSubAdmin) {
        isSubAdminCreate = false;
        const isSubAdmin = await knex("users").where('email', req.body.phoneNumber).first();
        if (isSubAdmin) {
          await knex("users").where('id', isSubAdmin.id).delete();
        }
      }
      if (data) {
        await knex('business_list').update({
          name: req.body.name,
          address: req.body.address,
          mapPin: req.body.mapPin,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email ? req.body.email : null,
          website: req.body.website ? req.body.website : null,
          gstnNumber: req.body.gstnNumber ? req.body.gstnNumber : null,
          state: req.body.state,
          district: req.body.district,
          isSubAdmin: isSubAdminCreate,
          note:req.body.note,
          slug:req.body.slug,
          notes:req.body.notes,
          districtNew:req.body.districtNew,
          score:req.body.score,
          isVisible:req.body.isVisible
        }).where('id', data.id);
      }
      return res.redirect('/admin/business')
    },


    async deleteBusiness(req, res) {
      const data = await knex('business_list').where('id', parseInt(req.params.id)).first()
      if (data) {
        await knex('business_list').where('id', data.id).delete()
      }
      return res.redirect('/admin/business')
    }
  }
}

module.exports = businessListController