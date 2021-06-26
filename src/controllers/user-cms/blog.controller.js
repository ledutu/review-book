function index(request, response) {
    response.render('user-cms/blog-management');
}

module.exports = {
    index,
}