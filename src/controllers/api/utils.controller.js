var express = require('express');

function deleteMessageSession(request, response) {
    delete request.session.message;
    response.status(200).json({
        status: 200,
    })
}

module.exports = {
    deleteMessageSession
}