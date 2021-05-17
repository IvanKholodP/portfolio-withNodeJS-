const { Router } = require('express');
const Blog = require('../models/Blog')
const router = Router();


router.get('/blog', async (req, res) => {
	try {
		let obj = {
			title: 'Blog'
		};
		Object.assign(obj, req.app.locals.settings);
		//отримуємо список записів в блозі з бази
		await Blog
			.find()
			.then(items => {
				// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон список записів в блозі
				Object.assign(obj, { items: items });
				res.render('pages/blog', obj);
			});
	} catch (e) {
		res.status(500).json({ message: 'Щось пішло не так: ' + e });
	}
});

router.post('/adminapi/addarticle', async (req, res) => {
	try {
		//вимагаємо наявності номера, заголовка, дати та вмісту статті
		if (!req.body.list || !req.body.title || !req.body.date || !req.body.text) {
			//якщо щось не вказано - повідомлюємо про це
			return res.json({ message: 'Вкажіть дані!' });
		}

		const blog = new Blog({
			list: req.body.list,
			title: req.body.title,
			date: req.body.date,
			text: req.body.text
		})

		await blog.save()

		res.json({ message: 'Стаття успішно додана' });
	} catch (e) {
		res.status(500).json({ message: 'При додаванні статті виникла помилка: ' + error });
	};
});

router.delete('/adminapi/removearticle', async (req, res) => {
	try {
		if (req.body.id == "false") {
			return res.json({ message: 'Виберіть статтю' });
		};
		const blogId = req.body.id;

		await Blog.deleteOne({ _id: blogId });

		res.json({ message: 'Стаття успішно видалена' });
	} catch (e) {
		res.status(500).json({ message: 'При видаленні даних виникла помилка: ' + e });
	};
});


module.exports = router;