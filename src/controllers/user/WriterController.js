var express = require('express');
const { User } = require('../../models/user/user');

async function index(request, response) {

    let { page, limit, full_name, username } = request.query;

    try {
        
        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 5;

        let allUsers = User.find({});
        let totalUser = await User.countDocuments();

        if (full_name) {
            allUsers = User.find({ 'profile.full_name': { $regex: new RegExp(full_name, 'i') } });
            totalUser = await User.find({ 'profile.full_name': { $regex: new RegExp(full_name, 'i') } }).count()
        }

        if (username) {
            allUsers = User.find({ 'profile.username': { $regex: new RegExp(username, 'i') } });
            totalUser = await User.find({ 'profile.username': { $regex: new RegExp(username, 'i') } }).count()
        }

        const userResults = await allUsers
            .select(['profile', 'total_book'])
            .sort({total_book: -1})
            .skip((page * limit) - limit)
            .limit(limit);

        const allUsersPage = {
            data: userResults,
            total_page: Math.ceil(totalUser / limit),
            page,
            limit,
        };

        response.render('user/writer-list', {
            allUsersPage,
        });

    } catch (error) {
        console.log(error);
        response.send(error)
    }
}

module.exports = {
    index,
}