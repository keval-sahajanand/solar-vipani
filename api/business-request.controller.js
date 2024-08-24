const knex = require('../common/knex.config')()

function businessRequestController() {
  return {
    async newBusinessAddRequest (req,res){
      try {
        const {name,address,mapPin,phoneNumber,email,website,gstnNumber,state,district,city,type}=req.body

        if(name ===  '' || address === '' || mapPin === '' || phoneNumber === ''|| city==='' || state === '' || district === ''){
          return res.json({
            res:false,
            message:'All parameters are required!'
          })
        }

        await knex('business_requests').insert({
          name: name,
          address: address,
          mapPin: mapPin,
          phoneNumber: phoneNumber,
          email: req.body.email ? req.body.email : null,
          website: req.body.website ? req.body.website :null,
          gstnNumber: req.body.gstnNumber?req.body.gstnNumber:null,
          state: state,
          district: district,
          city:city,
          type:type
        });    

        return res.json({
          res:true,
          message:'Successfully New Business add request sent!'
        })

      } catch (error) {
        return res.json({
          res:false,
          message:'error'
        })
      }

    },

    async businessCallRequest(req,res){
      try {
        
        const {name,phoneNumber,id}=req.body
        if(name === '' || phoneNumber === '' || id === ''){
          return res.json({
            res:false,
            message:'All parameters are required!'
          })
        }

        const isBusiness=await knex('business_list').where('id',parseInt(id)).first()
        
        if(!isBusiness){
          return res.json({
            res:false,
            message:'Business is not found!'
          })
        }

        await knex('call_requests').insert({
          businessId:isBusiness.id,
          name:name,
          phoneNumber:phoneNumber
        })

        return res.json({
          res:true,
          message:'Successfully Call Request sent!'
        })

      } catch (error) {
        return res.json({
          res:false,
          message:'error'
        })
      }
    }
  }
  
}

module.exports=businessRequestController
