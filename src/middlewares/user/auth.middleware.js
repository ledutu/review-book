var auth = require('../../config/auth');

function isAuthenticate(request, response, next) {
    if (request.user) {
        request.app.locals.user = request.user;
        return next();
    }
    console.log('not login');
    request.app.locals.user = undefined;
    next();
}

function isLogin(request, response, next) {
    if(!request.user) {
        request.session.message = {
            status: 'error',
            content: 'Bạn phải đăng nhập mới vào được chức năng này',
        }

        return response.redirect('/');
    }
    
    return next();
}

module.exports = {
    isAuthenticate,
    isLogin,
}