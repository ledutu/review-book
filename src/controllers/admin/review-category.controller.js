var express = require('express');
const { BookCategory } = require('../../models/user/book_category');
const HTTP = require('../../constant/http-status');
async function show(req, res) {
	try {
		let {page,limit,cate_name,short_name,tag_color,hide} = req.query
		let params = {cate_name,short_name,tag_color,hide}
		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if (!limit) limit = 5
		link='?'
		let category = BookCategory.find({})

		let totalCategory =  BookCategory.find({})
		
		if(cate_name){
			link += 'cate_name=' + cate_name + '&'
			category = category.where('name').equals({ $regex: new RegExp(cate_name, 'i') });
            totalCategory = totalCategory.where('name').equals({ $regex: new RegExp(cate_name, 'i') });
		}
		if(short_name){
			link += 'short_name=' + short_name + '&'
			category = category.where('short_name').equals({ $regex: new RegExp(short_name, 'i') });
            totalCategory = totalCategory.where('short_name').equals({ $regex: new RegExp(short_name, 'i') });
		}
		if(tag_color){
			link += 'tag_color=' + tag_color + '&'
			category = category.where('tag_color').equals({ $regex: new RegExp(tag_color, 'i') });
            totalCategory = totalCategory.where('tag_color').equals({ $regex: new RegExp(tag_color, 'i') });
		}
		if (hide) {
			if(hide==='true'){
				link += 'hide=' + hide +'&' 
				category = category.where('hide').equals({ $in:true })
				totalCategory = totalCategory.where('hide').equals({ $in: true })
			}else if(hide==='false'){
				link += 'hide=' + hide +'&' 
				category = category.where('hide').equals({ $in:false })
				totalCategory = totalCategory.where('hide').equals({ $in: false })
			}
        }
		
		const categoryResults = await category
							.select(['name', 'short_name','tag_color','_id','hide'])
							.skip((page * limit) - limit)
							.limit(limit)
							.lean();

		totalCategory = await totalCategory.countDocuments()

		const allCatePage = {
			data: categoryResults,
			total_page: Math.ceil((totalCategory/limit)),
			page,
			limit,
		}
        
		res.render('admin/review-category',{
			totalCategory,
			allCatePage,
			link,
			params
		});
		// res.json(books)
		// console.log(books)
	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function getCreate(req,res) {
	try {		
		const {id} = req.query
		reviewTag = {}
		if(id){
			reviewTag = await BookCategory.findById(id)
		}

		res.render('admin/create-review-category',{
			id,
			reviewTag
		});
	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function postCreate(req,res) {
	try {
		let {cate_name,short_name,tag_color} = req.body
		reviewTag = new BookCategory({
			name:cate_name,
			short_name,
			tag_color,
		})

		await reviewTag.save()

		req.session.message = {
			status: 'success',
			content: 'Tạo thành công!',
		}

		return res.redirect('/admin/review-category')
	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function postUpdate(req,res) {
	try {
		let {cate_name,short_name,tag_color,id} = req.body

		reviewTag = await BookCategory.findById(id)

		if(!reviewTag){
			req.session.message = {
				status: 'error',
				content: 'Không tìm thấy thể loại',
			}

			return res.redirect('back')
		}

		reviewTag.name = cate_name
		reviewTag.short_name = short_name
		reviewTag.tag_color = tag_color

		await reviewTag.save()

		req.session.message = {
			status: 'success',
			content: 'Cập nhật thành công',
		}

		return res.redirect('/admin/review-category')


	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function hideCate(req, res) {
	const {id} = req.body;
	try {
		reviewTag = await BookCategory.findOne({_id:id})
		reviewTag.hide = !reviewTag.hide
		// await User.hidereviewTagOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		await reviewTag.save()
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: reviewTag.hide ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
		});

	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
	}
}

module.exports = {
	show,
	getCreate,
	postCreate,
	postUpdate,
	hideCate
};
