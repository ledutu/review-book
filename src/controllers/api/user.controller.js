var express = require('express');
const { BookComment } = require('../../models/user/book_comment');
const { Reaction } = require('../../models/user/reaction');
const { Book } = require('../../models/user/book');
const { BlogComment } = require('../../models/user/blog_comment');
const { Blog } = require('../../models/user/blog');
const HTTP = require('../../constant/http-status');

async function deleteCommentReview(request, response) {
	const { id } = request.params;
	try {
		bookComment = await BookComment.findByIdAndDelete(id);

		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Xóa thành công',
		});
	} catch (error) {
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
		});
	}
}

async function rateReview(request, response) {
	let { id, rate } = request.query;
	try {
		user = request.user;

		rate = parseInt(rate);

		reaction = await Reaction.findOne({
			type: 'book',
			user: user._id,
			type_id: id,
		});

		console.log(reaction);

		if (reaction) {
			reaction.rate = rate;
		} else {
			reaction = new Reaction({
				rate,
				type: 'book',
				user: user._id,
				type_id: id,
			});
		}

		await reaction.save();

		//Calculate vote
		reactions = await Reaction.find({
			type: 'book',
			type_id: id,
		});

		let total = 0;
		reactions.forEach((react) => {
			total += react.rate;
		});

		await Book.findByIdAndUpdate(id, {
			vote: (total / reactions.length).toFixed(2),
		});

		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Đánh giá thành công',
		});
	} catch (error) {
		console.log(error);
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
		});
	}
}

async function postCommentReview(request, response) {
	let { comment, id } = request.body;

	try {
		user = request.user;
		bookComment = new BookComment({
			user: user._id,
			content: comment,
			book: id,
		});

		await bookComment.save();

		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Bình luận thành công',
			data: {
				comment: bookComment,
				user: user,
			},
		});
	} catch (error) {
		console.log(error);
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
			data: {},
		});
	}
}

async function editCommentReview(request, response) {
	try {
		const { id } = request.params;
		const { comment } = request.body;
		await BookComment.updateOne(
			{ _id: id },
			{ $set: { content: comment } }
		);
		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			data: {
				newCmt: comment,
			},
			message: 'Cập nhật bình luận thành công',
		});
	} catch (error) {
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
		});
	}
}



async function editCommentBlog(request, response) {
	try {
		const { id } = request.params;
		const { comment } = request.body;
		await BlogComment.updateOne(
			{ _id: id },
			{ $set: { content: comment } }
		);
		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			data: {
				newCmt: comment,
			},
			message: 'Cập nhật bình luận thành công',
		});
	} catch (error) {
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
		});
	}
}

async function deleteCommentBlog(request, response) {
	const { id } = request.params;
	try {
		blogComment = await BlogComment.findByIdAndDelete(id);

		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Xóa thành công',
		});
	} catch (error) {
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
		});
	}
}

async function rateBlog(request, response) {
	let { id, rate } = request.query;
	try {
		user = request.user;

		rate = parseInt(rate);

		reaction = await Reaction.findOne({
			type: 'blog',
			user: user._id,
			type_id: id,
		});

		if (reaction) {
			reaction.rate = rate;
		} else {
			reaction = new Reaction({
				rate,
				type: 'blog',
				user: user._id,
				type_id: id,
			});
		}

		await reaction.save();

		//Calculate vote
		reactions = await Reaction.find({
			type: 'blog',
			type_id: id,
		});

		let total = 0;
		reactions.forEach((react) => {
			total += react.rate;
		});

		await Blog.findByIdAndUpdate(id, {
			vote: (total / reactions.length).toFixed(2),
		});

		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Đánh giá thành công',
		});
	} catch (error) {
		console.log(error);
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
		});
	}
}

async function postCommentBlog(request, response) {
	let { comment, id } = request.body;

	try {
		user = request.user;
		blogComment = new BlogComment({
			user: user._id,
			content: comment,
			blog: id,
		});

		await blogComment.save();

		response.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: 'Bình luận thành công',
			data: {
				comment: blogComment,
				user: user,
			},
		});
	} catch (error) {
		console.log(error);
		response.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xuất hiện, xin vui lòng thử lại sau',
			data: {},
		});
	}
}

module.exports = {
	deleteCommentReview,
	rateReview,
	postCommentReview,
	deleteCommentBlog,
	rateBlog,
	postCommentBlog,
	editCommentReview,
	editCommentBlog,
};
