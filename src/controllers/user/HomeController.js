var express = require('express');
const { User } = require('../../models/user/user');

async function index(request, response) {
    // console.log(User);

    // const userModel = {
    //     id: "123452",
    //     username: "ledutu",
    //     email: "ledutu.it@gmail.com",
    //     full_name: "Le Duc Tung",
    //     address: "341/19/14 Khuong Viet",
    //     password: "$2y$12$nSnRhlAKH77f6X/abvrFX.EGK98yUr7p/czVbpNUyux2hBpewjoIC",
    //     password_not_hash: "123456",
    //     image: "https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg",
    //     user_follow: [],
    //     block: false,
    // }

    try {
        // const user = new User(userModel);

        // const userResponse = await user.save();

        response.render('user/home');
    } catch (error) {
        
        return response.send(error);
    }


    // User.find().then((result) => {
    //     console.log(result);

    // }).catch((err) => {
    //     console.log(err);
    // });;
    
    // return response.send()

}

module.exports = {
    index,
}