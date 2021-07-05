var express = require('express');
const { BlogTag } = require('../../models/user/blog_tag');
const HTTP = require('../../constant/http-status');
async function show(req, res) {
	try {
		let {page,limit,cate_name,tag_color,block} = req.query
		let params = {cate_name,tag_color,block}
		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if (!limit) limit = 5
		link='?'
		let category = BlogTag.find({})

		let totalCategory =  BlogTag.find({})
		
		if(cate_name){
			link += 'cate_name=' + cate_name + '&'
			category = category.where('name').equals({ $regex: new RegExp(cate_name, 'i') });
            totalCategory = totalCategory.where('name').equals({ $regex: new RegExp(cate_name, 'i') });
		}
		if(tag_color){
			link += 'tag_color=' + tag_color + '&'
			category = category.where('tag_color').equals({ $regex: new RegExp(tag_color, 'i') });
            totalCategory = totalCategory.where('tag_color').equals({ $regex: new RegExp(tag_color, 'i') });
		}
		if (block) {
			if(block==='true'){
				link += 'block=' + block +'&' 
				category = category.where('block').equals({ $in:true })
				totalCategory = totalCategory.where('block').equals({ $in: true })
			}else if(block==='false'){
				link += 'block=' + block +'&' 
				category = category.where('block').equals({ $in:false })
				totalCategory = totalCategory.where('block').equals({ $in: false })
			}
        }
		
		const categoryResults = await category
							.select(['name','tag_color','_id','block'])
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
        
		res.render('admin/blog-tag',{
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
		blogTag = {}
		if(id){
			blogTag = await BlogTag.findById(id)
		}

		res.render('admin/create-blog-tag',{
			id,
			blogTag
		});
	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function postCreate(req,res) {
	try {
		let {cate_name,tag_color} = req.body
		blogTag = new BlogTag({
			name:cate_name,
			tag_color,
		})

		await blogTag.save()

		req.session.message = {
			status: 'success',
			content: 'Tạo thành công!',
		}

		return res.redirect('/admin/blog-tag')
	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function postUpdate(req,res) {
	try {
		let {cate_name,tag_color,id} = req.body

		blogTag = await BlogTag.findById(id)

		if(!blogTag){
			req.session.message = {
				status: 'error',
				content: 'Không tìm thấy thể loại',
			}

			return res.redirect('back')
		}

		blogTag.name = cate_name
		blogTag.tag_color = tag_color

		await blogTag.save()

		req.session.message = {
			status: 'success',
			content: 'Cập nhật thành công',
		}

		return res.redirect('/admin/blog-tag')


	} catch (error) {
		console.error(error);
        return response.redirect('500');
	}
}

async function blockCate(req, res) {
	const {id} = req.body;
	try {
		blogTag = await BlogTag.findOne({_id:id})
		blogTag.block = !blogTag.block
		// await User.blockblogTagOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		await blogTag.save()
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: blogTag.block ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
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
	blockCate
};
