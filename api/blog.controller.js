const knex = require('../common/knex.config')()

function blogsController() {
  return {
    async blogList(req, res) {
      const data = await knex('blogs').select('id', 'title', 'description', 'url',"details").orderBy('id','desc')
      return res.json({
        res: true,
        message: 'Success',
        data: data
      })
    },

    async blogDetails(req,res){
      try {
        const data = await knex('blogs').select('id', 'title', 'description', 'url','details').where("id",parseInt(req.params.id)).first()
      return res.json({
        res: true,
        message: 'Success',
        data: data
      })
      } catch (error) {
        return res.json({
          res: false,
          message: 'Error',
        
        })
      }
    }

  }
}
module.exports = blogsController