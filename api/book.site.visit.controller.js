const knex = require("../common/knex.config")()

function bookSiteVisitController() {
  return {
    async addRequest(req, res) {
      try {
        const { name, phoneNumber, address, comment } = req.body;

        if (name == "" || phoneNumber == "" || address == "") {
          return res.json({
            res: false,
            message: 'All parameters are required!'
          })
        }

        if (!req.files.image) {
          return res.json({
            res: false,
            message: 'Electricity bill image/pdf select!'
          })
        }

        const [id] = await knex("bookings").insert({
          name: name,
          phoneNumber: phoneNumber,
          email: "",
          address: address,
          buildingType: "",
          roofType: "",
          roofAge: "",
          queOneDate: "",
          queOneTime: "",
          queTwoDate: "",
          queTwoTime: "",
          comment: req.body.comment != '' ? comment : "",
          image: '/upload/' + req.files.image[0].filename,
        })

        await Promise.all(req.files.frontView.map(async (a) => {
          await knex("sitebookimages").insert({
            siteBookId: id,
            image: '/upload/' + a.filename,
            type: 'Front View'
          })
        }))

        await Promise.all(req.files.terraceView.map(async (a) => {
          await knex("sitebookimages").insert({
            siteBookId: id,
            image: '/upload/' + a.filename,
            type: 'Terrace View'
          })
        }))

        return res.json({
          res: true,
          msg: "Successfully booked site visit.",
        })

      } catch (error) {
        return res.json({
          res: false,
          msg: "Error"
        })
      }
    },

   
  }
}

module.exports = bookSiteVisitController