var auth = require('../../config/auth');

function isAuthenticate(request, response, next) {
    if (request.user) {
        request.app.locals.user = request.user;
        return next();
    }
    console.log('not login');
    next();
}

module.exports = {
    isAuthenticate,
}