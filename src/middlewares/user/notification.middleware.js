
function isMessage(request, response, next) {
    if (request.session.message) {
        console.log('message');
        request.app.locals.message = request.session.message;
        
        return next();
    }
    console.log('not message');
    request.app.locals.message = undefined;
    next();
}

module.exports = {
    isMessage,
}