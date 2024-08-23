const logincon = require('../app/Controllers/logincon');
const loginmid = require('../app/Middleware/adminlogin');
const businessListController = require('../app/Controllers/business-list.controllers')
const userQueriesController = require('../app/Controllers/user.queries.controllers')
const businessRequestController = require('../app/Controllers/business-request.controller')
const callRequestController = require('../app/Controllers/call-request.controller')
const userQuoteController = require('../app/Controllers/user.quote.controller')
const opinionController = require('../app/Controllers/opinion.controllers')
const blogListController = require('../app/Controllers/blogs.controller')
const userController = require('../app/Controllers/users.controller')
const databaseBackupController = require('../app/Controllers/database-bakup')
const bookSiteVisitController = require("../app/Controllers/book-site-visit")
const businessReviewController=require("../app/Controllers/business-review.controller")

function webroutes(app) {
    app.get('/', (req, res) => {
        res.send('Hello');
    })

    // auth
    app.get('/login', logincon().index)
    app.post('/login', logincon().loginpost)
    app.get('/admin/logout', loginmid, logincon().userlogout)
    // app.get('/admin/dashboard', loginmid, logincon().dashboard)

    // Business
    app.get('/admin/business', loginmid, businessListController().index)
    app.get('/admin/business/:state', loginmid, businessListController().newIndex)


    app.post('/admin/business', loginmid, businessListController().newBusinessCreate)
    app.get("/admin/business-edit/:id",loginmid, businessListController().businessEditIndex)
    app.post('/admin/business/edit', loginmid, businessListController().businessEdit)
    app.get('/admin/business/:id/delete', loginmid, businessListController().deleteBusiness)

    // User queries
    app.get('/admin/user-queries', loginmid, userQueriesController().index)
    app.get('/admin/user-queries/:id/delete', loginmid, userQueriesController().userQueriesDelete)

    //Business request
    app.get('/admin/business-request', loginmid, businessRequestController().businessRequestList)
    app.post('/admin/business-request/edit', loginmid, businessRequestController().businessRequestEdit)
    app.get('/admin/business-request/:id/delete', loginmid, businessRequestController().businessRequestDelete)

    // Call request
    app.get('/admin/call-request', loginmid, callRequestController().index)
    app.get('/admin/call-request/:id/delete', loginmid, callRequestController().callRequestDelete)

    // Get User Quote
    app.get('/admin/user-quote', loginmid, userQuoteController().index)
    app.get('/admin/user-quote/:id/delete', loginmid, userQuoteController().userQuoteDelete)

    app.get('/admin/lead-qualification', loginmid, userQuoteController().leadQualification)
    app.post('/admin/lead-qualification/edit',loginmid,userQuoteController().leadQualificationEdit)
    app.get('/admin/lead-qualification/:id/delete',loginmid,userQuoteController().leadQualificationDelete)

    app.get('/admin/assigned-leads',loginmid,userQuoteController().assignedLeads)
    app.post('/admin/assigned-leads/edit',loginmid,userQuoteController().assignedLeadsEdit)

    //User Opinion
    app.get('/admin/user-opinion', loginmid, opinionController().index)
    app.get('/admin/user-opinion/:id/delete', loginmid, opinionController().userQuoteDelete)

    // Blogs
    app.get('/admin/blogs',loginmid,  blogListController().index)
    app.get("/admin/add-blogs",loginmid,blogListController().addBlogIndex)
    app.post('/admin/blogs',loginmid, blogListController().newBlogsCreate)
    app.get("/admin/blogs/edit/:id",loginmid, blogListController().editBlogIndex)
    app.post('/admin/blogs/edit', loginmid, blogListController().blogsEdit)
    app.get('/admin/blogs/:id/delete', loginmid, blogListController().deleteBlogs)

    // User / Partner
    app.get('/admin/user', loginmid, userController().index)
    app.post('/admin/user/edit', loginmid, userController().subAdminEdit)
    app.get('/partner/:state/:district', userController().partnerList)

    // Data Table Back up
    app.get("/download/:tableName", databaseBackupController().dataTableBackUp)

    // Book site visit
    app.get("/admin/book-site-visit",loginmid,bookSiteVisitController().index)
    app.get('/admin/book-site-visit/:id/delete', loginmid, bookSiteVisitController().deleteBookSiteVisit)
    app.get('/admin/site-book-image/:id',loginmid,bookSiteVisitController().bookSiteVisitImage)

    app.get("/admin/business-reviews",loginmid,businessReviewController().businessReviewList)
    app.get("/admin/business-review/:id/delete",loginmid,businessReviewController().businessReviewDelete)
}

module.exports = webroutes