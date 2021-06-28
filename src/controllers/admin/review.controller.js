var express = require('express');

const { Book } = require('../../models/user/book');
const { User } = require('../../models/user/user');
const { BookCategory } = require('../../models/user/book_category');
const moment = require('moment');
async function show(req, res) {
	let {page, limit , full_name , username, book_name,category, hide} = req.query
	try {
		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if (!limit) limit = 5

		let reviews = Book.find({})

		let totalReview = await Book.find({}).countDocuments()
		
		bookCategory = await BookCategory.find({})
		if(book_name){
			reviews = Book.find({ 'book_name': { $regex: new RegExp(book_name, 'i') } });
            totalReview = await Book.find({ 'book_name': { $regex: new RegExp(book_name, 'i') } }).countDocuments()
		}
		// if (full_name) {
        //     reviews = Book.find({ 'reviewer.profile.full_name': { $regex: new RegExp(full_name, 'i') } })
		// 					.populate('reviewer')
        //     totalReview = await Book.find({ 'reviewer.profile.full_name': { $regex: new RegExp(full_name, 'i') } }).countDocuments()
        // }
		if(category){
			reviews = Book.find({category:{'$in':category}})
			totalReview = await Book.find({category:{'$in':category}}).countDocuments()
		}
		if (hide) {
			if(hide==='true'){
				reviews = Book.find({'hide':true})
				totalReview = await Book.find({ 'hide': true }).countDocuments()
			}else if(hide==='false'){
				reviews = Book.find({'hide':false})
				totalReview = await Book.find({ 'hide': false }).countDocuments()
			}
        }
		const reviewResults = await reviews
									.select(['book_name','createdAt','reviewer','hide'])
									.populate('reviewer',['profile'])
									.populate('category', ['name', 'short_name'])
									.skip((page * limit) - limit)
									.limit(limit).lean()

		const formatDate = reviewResults.map( review =>
			({...review,createdAt : moment(review.createdAt).format('lll') })
		)
		const allReviewPage = {
			data: formatDate,
			total_page: Math.ceil((totalReview/limit)),
			page,
			limit,
		}
        res.render('admin/review',{allReviewPage , totalReview,bookCategory});

	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function update(req, res) {
	try {
		const review = await Book.findById(req.params.id)
		review.hide = !review.hide
		// await User.updateOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		const newReview =await review.save()
		res.json({newReview})

	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
async function detail(req, res) {
	try {
		const reviews = await Book.findById(req.params.id)
								.populate('reviewer',['profile'])
								.populate('category', ['name', 'short_name'])
		bookCategory = await BookCategory.find({})
        res.render('admin/review-detail',{reviews,bookCategory});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
module.exports = {
	show,update,detail
};
