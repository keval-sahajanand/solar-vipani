const knex=require('../common/knex.config')();

function userQuoteController() {
  
  return {
    async userQuoteAdd(req,res){
      const {systemSize,type,city,name,email,phoneNumber,state,pageType,pinCode}=req.body

      if( type === '' || city === '' || state=== ''){
        return res.json({
          res:false,
          message:'All parameters are required!'
        })
      }
      console.log(req.body);

      await knex('get_user_quote').insert({
        name:req.body.name? name: '---',
        email:req.body.email?email :'---',
        phoneNumber:req.body.phoneNumber? phoneNumber :'---',
        systemSize:systemSize,
        type:type,
        city:city,
        state:state,
        pageType:pageType,
        pinCode:pinCode,
        gclid_field: req.body.gclid_field?req.body.gclid_field: "---"
      })

      await knex('lead_qualification').insert({
        name:req.body.name? name: '---',
        email:req.body.email?email :'---',
        phoneNumber:req.body.phoneNumber? phoneNumber :'---',
        systemSize:systemSize,
        type:type,
        city:city,
        state:state,
        notes:"",
        pageType:pageType,
        pinCode:pinCode,
      })

      return res.json({
        res:true,
        message:'Successfully your quote submit!'
      })
    }
  }

}
module.exports=userQuoteController