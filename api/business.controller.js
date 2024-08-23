const knex = require('../common/knex.config')()

function businessController() {
  return {
    async businessList(req, res) {
      const data = await knex('business_list').select('id', 'name', 'address', 'mapPin', 'phoneNumber', 'email', 'website', 'gstnNumber', 'state', 'district', 'usefull as helpful', 'unUsefull as notHelpful', 'note',"slug")

      await knex('business_list')
        .update({ state: knex.raw('TRIM(state)') })

      return res.json({
        res: true,
        message: 'Success',
        data: data
      })
    },

    async businessHelpFullOrNot(req, res) {

      const { id, type } = req.body

      if (id === '' || type === '') {
        return res.json({
          res: false,
          message: 'All parameters are required!'
        })
      }

      const isBusiness = await knex('business_list').where('id', parseInt(id)).first()

      if (!isBusiness) {
        return res.json({
          res: false,
          message: 'Business is not found!'
        })
      }

      if (type === 'helpful') {
        await knex('business_list').update({
          usefull: isBusiness.usefull === null ? 1 : parseInt(isBusiness.usefull) + 1
        }).where('id', isBusiness.id)

        return res.json({
          res: true,
          message: "Successfully business helpful!"
        })

      } else {
        await knex('business_list').update({
          unUsefull: isBusiness.unUsefull === null ? 1 : parseInt(isBusiness.unUsefull) + 1
        }).where('id', isBusiness.id)

        return res.json({
          res: true,
          message: "Successfully business not helpful!"
        })

      }
    },

    async businessDetails(req, res) {
      try {

        const { id } = req.params;

        const data = await knex('business_list')
          .select('id', 'name', 'address', 'mapPin', 'phoneNumber', 'email', 'website', 'gstnNumber', 'state', 'district', 'usefull as helpful', 'unUsefull as notHelpful', 'note')
          .where("id", parseInt(id)).first()

        if (!data) {
          return res.json({
            res: false,
            message: 'Business details not found.',
          })
        }

        return res.json({
          res: true,
          message: 'Success',
          data: data
        })

      } catch (error) {
        return res.json({
          res: false,
          message: 'Somthing went to Wrong.',
        })
      }
    },

    async businessDetailsSlug(req,res){
      try {

        const { slug } = req.params;

        const data = await knex('business_list')
          .select('id', 'name', 'address', 'mapPin', 'phoneNumber', 'email', 'website', 'gstnNumber', 'state', 'district', 'usefull as helpful', 'unUsefull as notHelpful', 'note',"slug")
          .where("slug", slug).first()

        if (!data) {
          return res.json({
            res: false,
            message: 'Business details not found.',
          })
        }

        return res.json({
          res: true,
          message: 'Success',
          data: data
        })

      } catch (error) {
        return res.json({
          res: false,
          message: 'Somthing went to Wrong.',
        })
      }
    },

    async businessDetailsDistrict(req,res){
      try {

        const { district } = req.params;
        const {page,limit}=req.query
// console.log(district);

        const data = await knex('business_list')
          .select('id', 'name', 'address', 'mapPin', 'phoneNumber', 'email', 'website', 'gstnNumber', 'state', 'district', 'usefull as helpful', 'unUsefull as notHelpful', 'note',"slug")
          .where("district","LIKE", `%${district}%`).paginate({ perPage:limit?parseInt(limit):9, currentPage:page?parseInt(page): 1 });

        if (!data) {
          return res.json({
            res: false,
            message: 'Business details not found.',
          })
        }

        return res.json({
          res: true,
          message: 'Success',
          data: data.data,
          pagination:data.pagination
        })

      } catch (error) {
        return res.json({
          res: false,
          message: 'Somthing went to Wrong.',
        })
      }
    }
  }
}
module.exports = businessController