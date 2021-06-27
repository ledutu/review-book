function index(request, response) {
    response.render('user-cms/dashboard');
}

module.exports = {
    index,
}