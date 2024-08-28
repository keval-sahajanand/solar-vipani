const userQueriesController = require('../api/user.queries.controller')
const businessController = require('../api/business.controller')
const businessRequestController = require('../api/business-request.controller')
const userQuoteController = require('../api/user-quote.controller')
const opinionController = require('../api/opinion.controller')
const bookSiteVisitController = require("../api/book.site.visit.controller")
const blogsController = require('../api/blog.controller')
const businessReviewController = require('../api/business.review.controller')
const multer = require('../common/multer')
const statesData = require('../json/state.json');
const cityData = require("../json/city.json")
const knex = require('../common/knex.config')();
// const { default: knex } = require('knex')

function apiRoutes(app) {


  app.post('/user-queries', userQueriesController().userQueryAdd)
  app.get('/business-list', businessController().businessList)
  app.post('/business/helpful-nothelpful', businessController().businessHelpFullOrNot)
  app.get("/business-details/:id", businessController().businessDetails)
  app.get("/business-details-slug/:slug", businessController().businessDetailsSlug)
  app.get("/business-list-new/:district", businessController().businessDetailsDistrict)
  app.get("/business-list-city/:city", businessController().businessDetailsCity)

  app.post('/business/add-request', businessRequestController().newBusinessAddRequest)
  app.post('/call-request', businessRequestController().businessCallRequest)

  app.post('/opinion', opinionController().addOpinion)

  app.get('/districts/:state', (req, res) => {
    const state = req.params.state;
    const districts = statesData[state]?.data || [];

    res.json({ districts });
  });

  app.get('/citys/:district', (req, res) => {
    const district = req.params.district;
    const city = cityData[district]?.data || [];

    res.json({ city });
  });

  app.post('/user-quote', userQuoteController().userQuoteAdd)

  app.get('/blogs', blogsController().blogList)

  app.post('/book-site-visit', multer.fields([{ name: "image" }, { name: "frontView" }, { name: "terraceView" }]), bookSiteVisitController().addRequest)

  app.get("/blog-details/:id", blogsController().blogDetails)

  app.post("/business-review", businessReviewController().businessReviewAdd)

  //   app.get("/data-add",async (req,res)=>{
  //   const fs = require('fs');
  //   const path = require('path');

  //  await fs.readFile(path.join(__dirname, '../public/json/export_5.json'), async(err, data) => {
  //     if (err) {
  //       console.error(`Error reading file: ${err.path}`);
  //       return res.status(500).json({ message: `Failed to read file: ${err.code}` });
  //     }
  //     const jsonData = JSON.parse(data);
  //     await Promise.all(jsonData.map(async (a)=>{
  //       await knex('business_list').insert({
  //         name: a.Name,
  //         address: a.FullAddress,
  //         mapPin: a.PlusCode,
  //         phoneNumber: a.Phone,
  //         email: null,
  //         website: a.Weblink,
  //         gstnNumber: null,
  //         state: a.State,
  //         district: a.City,
  //         slug: a.Name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  //       });
  //     }))
  //     res.json(jsonData);
  //   });
  //   })

  // app.get("/data-add",async (req,res)=>{+
  //  const data= await knex('business_list').where("districtNew",null).limit(200)
  //  await Promise.all(data.map(async (a)=>{
  //   await knex("business_list").update({
  //     districtNew:a.district
  //   }).where("id",a.id)
  //  }))
  //   return res.json({data})
  // })

}
module.exports = apiRoutes