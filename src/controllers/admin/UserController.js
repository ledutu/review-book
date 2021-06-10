var express = require('express');
const { User } = require('../../models/user/user')
const { Profile } = require('../../models/user/profile')
async function index(request, response) {
    try {
        let perPage = 10;
        let page = request.query.page || 1;


        User.find({})
            .select(['_id','email','password_not_hash'])
            .populate('profile',['username','full_name'])
            .skip((perPage*page)-perPage)
            .limit(perPage)
            .exec((err,users)=>{
                User.countDocuments((err,count)=>{
                    if(err) return next(err);
                    response.render('admin/user',{
                        users,
                        current: page,
                        pages: Math.ceil(count/perPage)
                    })
                })
            })

    } catch (error) {
        console.log(error);
        response.send(error);
    }
}

module.exports = {
    index,
}

