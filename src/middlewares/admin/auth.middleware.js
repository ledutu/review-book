function isAdmin(req, res, next) {
    if (req.user) {
        if(req.user.role === 1){
            req.app.locals.admin = req.user;
            console.log('admin');
            return next();
        }
        console.log('no admin');
        req.session.message = {
            status: 'error',
            content: 'Tài khoản không phải admin',
        }
        req.app.locals.admin = undefined;
        return res.redirect('/admin/login');
    }
    console.log('no admin');
    req.session.message = {
        status: 'error',
        content: 'Bạn chưa đăng nhập',
    }
    req.app.locals.admin = undefined;
    return res.redirect('/admin/login');
}
module.exports = {
    isAdmin
}