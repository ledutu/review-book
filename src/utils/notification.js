function show(request, message) {
    request.app.locals.message = message;
}

function dismiss(request) {
    request.app.locals.message = '';
}

const Notification = {
    show,
    dismiss
}

module.exports = Notification