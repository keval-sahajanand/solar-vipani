const knex = require('../common/knex.config')()

function businessReviewController() {
  return {
    async businessReviewAdd(req, res) {
      try {
        // console.log(req.body);
        const { id, star, reviewTitle, reviewDescription, displayName, pincode, dateOfInstallation, sizeOfSystem, solarPanelBrand, inverterBrand, comment, mobileNumber } = req.body
        if(!id || !star || !reviewTitle || !reviewDescription || !pincode || !dateOfInstallation || !sizeOfSystem || !solarPanelBrand || !inverterBrand || !mobileNumber){
          return res.json({
            res: false,
            message: 'All fileds are required!',
          })
        }

        const isBusiness=await knex("business_list").where("id",parseInt(id)).first();
        if(!isBusiness){
          return res.json({
            res: false,
            message: 'Business Not found!',
          })
        }

        await knex("business_reviews").insert({
          businessId:isBusiness.id,
          businessName:isBusiness.name,
          star:star,
          reviewTitle:reviewTitle,
          reviewDescription:reviewDescription,
          pincode:pincode,
          dateOfInstallation:dateOfInstallation,
          sizeOfSystem:sizeOfSystem,
          solarPanelBrand:solarPanelBrand,
          inverterBrand:inverterBrand,
          mobileNumber:mobileNumber,
          displayName:req.body.displayName?displayName:"",
          comment:req.body.comment?comment:""
        })

        return res.json({
          res: true,
          message: 'Review successfully add.',
        })

      } catch (error) {
        return res.json({
          res: false,
          message: 'Somthing went to Wrong.',
        })
      }
    },

  }
}
module.exports = businessReviewController