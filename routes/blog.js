const { Router } = require('express');
const Blog = require('../models/Blog')
const router = Router();





router.get('/blog', (req, res) => {
	let obj = {
		title: 'Blog'
	};
	Object.assign(obj, req.app.locals.settings);
	//отримуємо список записів в блозі з бази
	Blog
		.find()
		.then(items => {
			// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон список записів в блозі
			Object.assign(obj, { items: items });
			res.render('pages/blog', obj);
		});
});

router.post('/admin/addarticle', async (req, res) => {
	//вимагаємо наявності номера, заголовка, дати та вмісту статті
	if (!req.body.list || !req.body.title || !req.body.date || !req.body.text) {
		//якщо щось не вказано - повідомлюємо про це
		return res.json({ status: 'Вкажіть дані!' });
	}
	const blog = new Blog({
		list: req.body.list,
		title: req.body.title,
		date: req.body.date,
		text: req.body.text
	})
	await blog.save().then(
		//обробляю і відправляю відповідь в браузер
		(i) => {
			return res.json({ status: 'Стаття успішно додана' });
		}, e => {
			//якщо є помилки то отримую їх список та передаю в шаблон
			const error = Object
				.keys(e.errors)
				.map(key => e.errors[key].message)
				.join(', ');
			//обробляю шаблон та передаю його в браузер
			res.json({
				status: 'При додаванні статті виникла помилка: ' + error
			});
		});
});
module.exports = router;