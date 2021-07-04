var express = require('express');

const { Book } = require('../../models/user/book');
const { User } = require('../../models/user/user');
const { BookCategory } = require('../../models/user/book_category');
const HTTP = require('../../constant/http-status');
const moment = require('moment');
async function show(req, res) {
	try {
		let {page, limit , full_name , username, book_name,category, hide,date_from, date_to,isConfirm} = req.query
		let params = {book_name,category, hide,date_from, date_to,isConfirm}
		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if (!limit) limit = 5
		link='?'
		let reviews = Book.find({})

		let totalReview = Book.find({})
		
		bookCategory = await BookCategory.find({})
		if(book_name){
			link += 'book_name=' + book_name + '&';
			reviews = reviews.where('book_name').equals({$regex: new RegExp(book_name, 'i')})
			totalReview = totalReview.where('book_name').equals({$regex: new RegExp(book_name, 'i')})
		}
		if(category){
			if(Array.isArray(category)){
				category.map(item =>{
					link += 'category=' + item + '&';	
				})
			}else{
				link += 'category=' + category + '&';
			}
			reviews = reviews.where('category').equals({ $in: category })
			totalReview = totalReview.where('category').equals({ $in: category })
		}
		if (hide) {
			if(hide==='true'){
				link += 'hide=' + hide +'&' 
				reviews = reviews.where('hide').equals({ $in:true })
				totalReview = totalReview.where('hide').equals({ $in: true })
			}else if(hide==='false'){
				link += 'hide=' + hide +'&' 
				reviews = reviews.where('hide').equals({ $in:false })
				totalReview = totalReview.where('hide').equals({ $in: false })
			}
        }
		if (isConfirm) {
			if(isConfirm==='true'){
				link += 'isConfirm=' + isConfirm +'&' 
				reviews = reviews.where('isConfirm').equals({ $in:true })
				totalReview = totalReview.where('isConfirm').equals({ $in: true })
			}else if(isConfirm==='false'){
				link += 'isConfirm=' + isConfirm +'&' 
				reviews = reviews.where('isConfirm').equals({ $in:false })
				totalReview = totalReview.where('isConfirm').equals({ $in: false })
			}
        }
		if (date_from) {
            link += 'date_from=' + date_from + '&';
            date_from = date_from.split('/');
            date_from = new Date(date_from[2] + '-' + date_from[1] + '-' + date_from[0]);
            reviews = reviews.where('createdAt').equals({ $gte: date_from });
           totalReview =totalReview.where('createdAt').equals({ $gte: date_from });
        }

        if (date_to) {
            link += 'date_from=' + date_to + '&';
            date_to = date_to.split('/');
            date_to = new Date(date_to[2] + '-' + date_to[1] + '-' + date_to[0]);
            reviews = reviews.where('createdAt').equals({ $lte: date_to });
           totalReview =totalReview.where('createdAt').equals({ $lte: date_to });
        }
		const reviewResults = await reviews
									.select(['book_name','createdAt','reviewer','hide','isConfirm'])
									.populate('reviewer',['profile'])
									.populate('category', ['name', 'short_name','tag_color'])
									.skip((page * limit) - limit)
									.limit(limit).lean()
		totalReview = await totalReview.countDocuments()
		const allReviewPage = {
			data: reviewResults,
			total_page: Math.ceil((totalReview/limit)),
			page,
			limit,
		}
        res.render('admin/review',{
			allReviewPage , 
			totalReview,
			bookCategory,
			link,
			params
		});

	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function hideReview(req, res) {
	const {id} = req.body;
	try {
		review = await Book.findOne({_id:id})
		review.hide = !review.hide
		// await User.hideReviewOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		await review.save()
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: review.hide ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
		});

	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
	}
}
async function confirmReview(req, res) {
	const {id} = req.body;
	try {
		review = await Book.findOne({_id:id})
		review.isConfirm = !review.isConfirm
		// await User.hideReviewOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		await review.save()
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: review.isConfirm ? 'Duyệt thành công' : 'Bỏ duyệt thành công',
		});

	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
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
	show,
	hideReview,
	detail,
	confirmReview
};
