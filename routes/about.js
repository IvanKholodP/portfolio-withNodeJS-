const { Router } = require('express');
const addFront = require('../models/AddSkillFront');
const addBack = require('../models/AddSkillBack');
const addWorkFlow = require('../models/AddSkillWorkFlow');
const router = Router();


router.get('/about', (req, res) => {
	const obj = {
		title: 'About',
		...req.app.locals.settings
	};
	Object.assign(obj, req.app.locals.settings);
	//отримуємо дані з бази
	addFront
		.find({})
		.then(addSkillFront => {
			// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон
			Object.assign(obj, { addSkillFront: addSkillFront });
			return addSkillFront;
		}).then(addSkillFront => {
			addBack
				.find({})
				.then(addSkillBack => {
					// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон
					Object.assign(obj, { addSkillBack: addSkillBack });
					return addSkillBack
				}).then(addSkillBack => {
					addWorkFlow
						.find({})
						.then(addSkillWorkFlow => {
							Object.assign(obj, { addSkillWorkFlow: addSkillWorkFlow });
							res.render('pages/about', obj);
						})
				})
		})
});
// router.get('/about', (req, res) => {
// 	res.render('pages/about', { title: 'About' });
// let obj = {
// 	title: 'About'
// };
// Object.assign(obj, req.app.locals.settings);
//отримуємо дані з бази
// Skills
// 	.find()
// 	.then(skill => {
// 		// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон
// 		Object.assign(obj, { skill: skill });
// 		res.render('pages/about', obj);
// 	});
// });

// Skills.find({}).lean().then(function (records) {
// 	records.forEach(function (record) {
// 		console.log(record._id);
// 	});
// });

// router.post('/admin/addskill', async (req, res) => {
// await Skills.
// await Skills.find({}).lean().then(function (records) {
// 	records.forEach(function (record) {
// 		if (record._id) {

// for (let key in req.body) {
// 	if (!req.body[key]) delete req.body[key]
// }

// Skills.findOneAndUpdate(`${record._id}`, req.body, { new: true }).then(
// 	//обробляю і відправляю відповідь в браузер
// 	(i) => {
// 		return res.json({ status: 'Дані успішно додані' });
// 	}, e => {
// 		//якщо є помилки то отримую їх список та передаю в шаблон
// 		const error = Object
// 			.keys(e.errors)
// 			.map(key => e.errors[key].message)
// 			.join(', ');
// 		//обробляю шаблон та передаю його в браузер
// 		res.json({
// 			status: 'При додаванні даних виникла помилка: ' + error
// 		});
// 	});
// }

/* 
const skill = new Skills({
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
	});
}); */


module.exports = router;