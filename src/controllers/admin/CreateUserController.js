var express = require('express');

function getCreateUser(req, res){
    res.render('admin/create-user');
}
function postCreateUser(req,res) {
    res.json(req.body)
    // res.end('Xu ly POST them san pham')
}
module.exports = {
    getCreateUser,
    postCreateUser
}

