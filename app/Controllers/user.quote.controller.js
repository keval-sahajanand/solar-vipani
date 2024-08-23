const knex = require('../../common/knex.config')()

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth returns zero-based month
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function userQuoteController() {
  return {
    async index(req, res) {
      const userlogin = req.session.userlogin;

      const data = await knex('get_user_quote').orderBy('id', 'desc')
      return res.render('user-quote', { data: data, userlogin: userlogin })
    },

    async userQuoteDelete(req, res) {
      await knex('get_user_quote').where('id', parseInt(req.params.id)).delete()
      return res.redirect('/admin/user-quote')
    },

    async leadQualification(req, res) {
      const userlogin = req.session.userlogin;
      const data = await knex('lead_qualification').orderBy('id', 'desc')
      return res.render('lead-qualification', { data: data, userlogin: userlogin })
    },

    async leadQualificationEdit(req, res) {
      const isLead = await knex("lead_qualification").where("id", parseInt(req.body.id)).first();
      if (isLead) {
        const currentDateTime = getCurrentDateTime();
        await knex("lead_qualification").update({
          svStatus: req.body.svStatus,
          pStatus: req.body.pStatus,
          partnerState: req.body.state ? req.body.state:"",
          partnerDistrict: req.body.district?req.body.district:"",
          partnerId: req.body.partner?req.body.partner:"",
          notes: req.body.notes,
          updatedAt:currentDateTime
        }).where("id", isLead.id)
      }
      return res.redirect('/admin/lead-qualification')
    },

    async leadQualificationDelete(req, res) {
      await knex('lead_qualification').where('id', parseInt(req.params.id)).delete()
      return res.redirect('/admin/lead-qualification')
    },

    async assignedLeads(req, res) {
      const userlogin = req.session.userlogin;
      const userData=await knex("users").select("id","name").where('id',parseInt(userlogin.id)).first()
      const data = await knex('lead_qualification').where("partnerId",userlogin.id).orderBy('id', 'desc')
      return res.render('assigned-leads', { data: data, userlogin: userlogin ,userData:userData})
    },

    async assignedLeadsEdit(req,res){
      const isLead = await knex("lead_qualification").where("id", parseInt(req.body.id)).first();
      if (isLead) {
        await knex("lead_qualification").update({
          pStatus: req.body.pStatus,
          notes: req.body.notes
        }).where("id", isLead.id)
      }
      return res.redirect('/admin/assigned-leads')
    }
  }
}

module.exports = userQuoteController