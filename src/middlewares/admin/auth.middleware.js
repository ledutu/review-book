var auth = require('../../config/auth');

function isAdmin(req, res, next) {
    if (req.user) {
        if(req.user.role === 1){
            req.app.locals.admin = req.user;
            next();
        }
        
        req.session.message = {
            status: 'error',
            content: 'Tài khoản không phải admin',
        }
        req.app.locals.admin = undefined;
        res.redirect('/admin/login');
    }
    
    req.session.message = {
        status: 'error',
        content: 'Bạn chưa đăng nhập',
    }
    req.app.locals.admin = undefined;
    res.redirect('/admin/login');
}
module.exports = {
    isAdmin
}