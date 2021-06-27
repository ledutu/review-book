

async function uploadBlogImage(request, response) {
    file = request.files[0];

    return response.status(200).json({
        status: 'OK',
        location: '/statics/uploads/users/' + request.user._id + '/blogs/' + file.filename,
    })
}

module.exports = {
    uploadBlogImage,
}