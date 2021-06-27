// var auth = require('../../config/auth');

// function isLogin(req, res, next) {
//     if(!req.user) {
//         req.session.message = {
//             status: 'error',
//             content: 'Bạn phải đăng nhập mới vào được chức năng này',
//         }

//         return res.redirect('/admin/login');
//     }
//     return next();
// }
// function checkAdmin(req,res,next) {
//     const user = req.user
//     if(user.role !== 0){
//         req.session.message = {
//             status: 'error',
//             content: 'Tài khoản không phải admin',
//         }
//         req.app.locals.admin = undefined;
//         res.redirect('/admin/login');
//     }
//     req.app.locals.admin = user;
//     return next()
// }
// module.exports = {
//     checkAdmin,
//     isLogin
// }