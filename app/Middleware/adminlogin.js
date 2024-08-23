function adminlogin(req, res, next) {
    if (req.session.userlogin) {
        if (req.session.userlogin.userlogintype === 'userlogin') {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}

module.exports = adminlogin