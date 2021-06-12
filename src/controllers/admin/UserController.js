var express = require('express');
const { User } = require('../../models/user/user');
const { Profile } = require('../../models/user/profile');
async function show(request, response) {
	try {
		const users = await User.find({})
			.select(['_id', 'email', 'profile'])
            response.render('admin/user',{users});
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}
async function edit(request, response) {
	try {
		const users = await User.findById(request.params.id)
		// const users = await User.find({})
		// 	.select(['_id', 'email', 'profile'])
            response.render('admin/edit-user',{users});
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}

async function update(request, response) {
	try {
		const {email,username,full_name} = request.body
		const users = {
			email,
			profile:{
				username,
				full_name
			}
		}

		await User.updateOne({_id:request.params.id }, {$set:{'email':email,'profile.username':username,'profile.full_name':full_name}})

		response.redirect('/admin/user')
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}

async function destroy(request, response) {
	try {
		await User.deleteOne({_id:request.params.id })
		response.redirect('back')
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}


module.exports = {
	show,edit,update,destroy
};
