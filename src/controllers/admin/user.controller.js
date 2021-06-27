var express = require('express');
const { User } = require('../../models/user/user');
const { Profile } = require('../../models/user/profile');
async function show(req, res) {
	let {page, limit , full_name , username, email, block} = req.query
	try {
		

		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if (!limit) limit = 5

		let users = User.find({})

		let totalUser = await User.countDocuments();

		if (full_name) {
            users = User.find({ 'profile.full_name': { $regex: new RegExp(full_name, 'i') } });
            totalUser = await User.find({ 'profile.full_name': { $regex: new RegExp(full_name, 'i') } }).count()
        }

        if (username) {
            users = User.find({ 'profile.username': { $regex: new RegExp(username, 'i') } });
            totalUser = await User.find({ 'profile.username': { $regex: new RegExp(username, 'i') } }).count()
        }
		if (email) {
            users = User.find({ 'email': { $regex: new RegExp(email, 'i') } });
            totalUser = await User.find({ 'email': { $regex: new RegExp(email, 'i') } }).count()
        }

        if (block) {
			if(block==='true'){
				users = User.find({'block':true})
				totalUser = await User.find({ 'block': true }).count()
			}else if(block==='false'){
				users = User.find({'block':false})
				totalUser = await User.find({ 'block': false }).count()
			}
        }

		const userResults = await users
						.select(['_id', 'email', 'profile','block'])
						.skip((page * limit) - limit)
						.limit(limit)
		const allUserPage = {
			data: userResults,
			total_page: Math.ceil((totalUser/limit)),
			page,
			limit,
		}
        res.render('admin/user',{allUserPage,totalUser});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
async function edit(req, res) {
	try {
		const users = await User.findById(req.params.id)
            res.render('admin/edit-user',{users});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function update(req, res) {
	try {
		const user = await User.findById(req.params.id)
		user.block = !user.block
		// await User.updateOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		const newUser =await user.save()
		res.json({newUser})

	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function destroy(req, res) {
	try {
		await User.deleteOne({_id:req.params.id })
		res.redirect('back')
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}


module.exports = {
	show,edit,update,destroy
};
