const knex = require('../../common/knex.config')();


function blogListController() {
  return {
    async index(req, res) {
      const userlogin = req.session.userlogin;

      const data = await knex('blogs').orderBy('id', 'desc')

      return res.render('blogs', { data: data, userlogin: userlogin })
    },

    async addBlogIndex(req, res) {
      const userlogin = req.session.userlogin;
      return res.render('blog-create',{  userlogin: userlogin })
    },

    async newBlogsCreate(req, res) {
      await knex('blogs').insert({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        details:req.body.editor1
      });
      return res.redirect('/admin/blogs')
    },

    async editBlogIndex(req,res){

      const userlogin = req.session.userlogin;
      const data = await knex('blogs').where("id",parseInt(req.params.id)).first();
      return res.render('blog-edit',{ data:data, userlogin: userlogin })
    },

    async blogsEdit(req, res) {
      const data = await knex('blogs').where('id', parseInt(req.body.id)).first()
      if (data) {
        await knex('blogs').update({
          title: req.body.title,
          description: req.body.description,
          url: req.body.url,
          details:req.body.editor1
        }).where('id', data.id);
      }
      return res.redirect('/admin/blogs')
    },

    async deleteBlogs(req, res) {
      const data = await knex('blogs').where('id', parseInt(req.params.id)).first()
      if (data) {
        await knex('blogs').where('id', data.id).delete()
      }
      return res.redirect('/admin/blogs')
    }

  }
}

module.exports = blogListController