const knex = require('../../common/knex.config')()

function logincontroller() {
    return {
        async index(req, res) {
            if (req.session.userlogin) {
                if (req.session.userlogin.userlogintype === 'userlogin') {
                    res.redirect('/admin/business');
                } else {
                    res.render('login')
                }
            } else {
                res.render('login')
            }
        },
        async loginpost(req, res) {
            const { username, userpass } = req.body;
            const isUser = await knex('users').where('email', username).where('password', userpass).first()
            if (isUser) {
                req.session.userlogin = { userlogintype: "userlogin",type: isUser.type ,id:isUser.id,email:isUser.email}
               
                if(isUser.type == "subAdmin"){
                    res.redirect('/admin/assigned-leads');

                }else{

                    res.redirect('/admin/business');
                }
            } else {
                res.redirect('/login')
            }

        },
        async userlogout(req, res) {
            req.session.userlogin = { userlogintype: "logout" }
            res.redirect('/login')
        },
        async dashboard(req, res) {
            res.render('dashboard')
        }
    }
}

module.exports = logincontroller;