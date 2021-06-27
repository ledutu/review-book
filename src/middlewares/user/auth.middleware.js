var auth = require('../../config/auth');
const HTTP = require('../../constant/http-status');

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

function isLoginApi(request, response, next) {
    if(!request.user) {
        return response.status(HTTP.UN_AUTHORIZED).json({
            status: HTTP.UN_AUTHORIZED,
            error: true,
            message: 'Bạn chưa đăng nhập',
        });
    }    
    
    next();
}

module.exports = {
    isAuthenticate,
    isLogin,
    isLoginApi,
}