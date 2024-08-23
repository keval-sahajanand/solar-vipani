const knex = require('../common/knex.config')()

function opinionController() {
  return {
    async addOpinion(req, res) {
      try {

        if (req.body.message === '') {
          return res.json({
            res: false,
            message: 'All parameters are required!'
          })
        }

        await knex('opinions').insert({
          message: req.body.message
        })

        return res.json({
          res:true,
          message:'Successfully your Opinion Add.'
        })

      } catch (error) {
        return res.json({
          res: false,
          message: 'Error'
        })
      }
    }
  }
}
module.exports = opinionController