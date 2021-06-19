var express = require('express');


async function show(req,res) {
    try {
        res.render('admin/banner-category')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}
async function create(req,res) {
    try {
        res.render('admin/create-banner-category')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}



module.exports = {
    show, create
}