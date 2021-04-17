const { Router } = require('express');
const Skills = require('../models/Skills');
const router = Router();


router.get('/about', (req, res) => {
	let obj = {
		title: 'About'
	};
	Object.assign(obj, req.app.locals.settings);
	//отримуємо дані з бази
	Skills
		.find()
		.then(skill => {
			// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон
			Object.assign(obj, { skill: skill });
			res.render('pages/about', obj);
		});
});

router.post('/admin/addskill', async (req, res) => {

	for (let key in req.body) {
		if (!req.body[key]) delete req.body[key]
	}

	await Skills.findOneAndUpdate('607aedc42d459703504b775e', req.body, { new: true }).then(
		//обробляю і відправляю відповідь в браузер
		(i) => {
			return res.json({ status: 'Дані успішно додані' });
		}, e => {
			//якщо є помилки то отримую їх список та передаю в шаблон
			const error = Object
				.keys(e.errors)
				.map(key => e.errors[key].message)
				.join(', ');
			//обробляю шаблон та передаю його в браузер
			res.json({
				status: 'При додаванні даних виникла помилка: ' + error
			});
		});


	/* const skill = new Skills({
		html5: req.body.html5,
		css3: req.body.css3,
		js: req.body.js,
		sass: req.body.sass,
		sql: req.body.sql,
		node: req.body.node,
		mongo: req.body.mongo,
		git: req.body.git,
		webpack: req.body.webpack,
		avocode: req.body.avocode,
		rest: req.body.rest
	})
	await skill.save(
		//обробляю і відправляю відповідь в браузер
		(i) => {
			return res.json({ status: 'Дані успішно додані' });
		}, e => {
			//якщо є помилки то отримую їх список та передаю в шаблон
			const error = Object
				.keys(e.errors)
				.map(key => e.errors[key].message)
				.join(', ');
			//обробляю шаблон та передаю його в браузер
			res.json({
				status: 'При додаванні даних виникла помилка: ' + error
			});
		}); */
});

module.exports = router;