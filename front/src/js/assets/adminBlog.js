import prepareSend from './prepareSend';

const formBlog = document.querySelector('#admin-blog');
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
		console.log(data)
		prepareSend('/admin/addarticle', formBlog, data);
	}
}
