import prepareSend from './prepareSend';

const formBlog = document.querySelector('#admin-blog-add');
if (formBlog) {
	formBlog.addEventListener('submit', prepareSendPost);

	function prepareSendPost(e) {
		e.preventDefault();

		let data = {
			list: formBlog.list.value,
			title: formBlog.title.value,
			date: formBlog.date.value,
			text: formBlog.text.value
		};
		prepareSend('/adminapi/addarticle', formBlog, data, 'POST');
	};
};

const formBlogDel = document.querySelector('#admin-blog-remove');

if (formBlogDel) {
	formBlogDel.addEventListener('submit', (e) => {
		e.preventDefault();

		let data = {
			id: formBlogDel.bloglist.value,
		};
		prepareSend('/adminapi/removearticle', formBlogDel, data, 'DELETE');
	});
};
