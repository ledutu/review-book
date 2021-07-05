var express = require('express');
const { User } = require('../../models/user/user');
const { Profile } = require('../../models/user/profile');
const HTTP = require('../../constant/http-status');
async function show(req, res) {
	try {
		let { page, limit, full_name, username, email, block } = req.query;
		let params = { full_name, username, email, block };

		page = parseInt(page);
		limit = parseInt(limit);

		if (!page) page = 1;
		if (!limit) limit = 5;

		link='?'
		
		let users = User.find({'role':'2'});

		let totalUser = User.find({'role':'2'})

		if (full_name) {
			link += 'full_name=' + full_name + '&' 
			users = users.where('profile.full_name').equals({$regex: new RegExp(full_name, 'i')})
			totalUser = totalUser.where('profile.full_name').equals({$regex: new RegExp(full_name, 'i')})
		}

		if (username) {
			link += 'username=' + username + '&' 
			users = users.where('profile.username').equals({$regex: new RegExp(username, 'i')})
			totalUser = totalUser.where('profile.username').equals({$regex: new RegExp(username, 'i')})
		}
		if (email) {
			link += 'email=' + email + '&' 
			users = users.where('email').equals({$regex: new RegExp(email, 'i')})
			totalUser = totalUser.where('email').equals({$regex: new RegExp(email, 'i')})
		}

		if (block) {
			if (block === 'true') {
				link += 'block=' + block + '&' 
				users = users.where('block').equals({ $in:true })
				totalUser = totalUser.where('block').equals({ $in: true })
			} else if (block === 'false') {
				link += 'block=' + block + '&' 
				users = users.where('block').equals({ $in:false })
				totalUser = totalUser.where('block').equals({ $in: false })
			}
		}

		const userResults = await users
			.select(['_id', 'email', 'profile', 'block'])
			.skip(page * limit - limit)
			.limit(limit)
			.lean()
		totalUser = await totalUser.countDocuments()
		const allUserPage = {
			data: userResults,
			total_page: Math.ceil(totalUser / limit),
			page,
			limit,
		};
		res.render('admin/administrators', { allUserPage, totalUser, params ,link});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
async function edit(req, res) {
	try {
		const users = await User.findById(req.params.id);
		res.render('admin/edit-user', { users });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function hideUser(req, res) {
	const { id } = req.body;
	try {
		user = await User.findOne({_id:id})
		user.block = !user.block;
		// await User.hideUserOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		await user.save();
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: user.block ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
		});
	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
	}
}

async function confirmRole(req, res) {
	const { id } = req.body;
	try {
		user = await User.findOne({_id:id})
		user.role = 0;
		// await User.hideUserOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		await user.save();
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Cấp quyền thành công',
		});
	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
	}
}

async function destroy(req, res) {
	try {
		await User.deleteOne({ _id: req.params.id });
		res.redirect('back');
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

module.exports = {
	show,
	edit,
	hideUser,
	destroy,
	confirmRole,
};
