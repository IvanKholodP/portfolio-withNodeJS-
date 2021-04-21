const { Router } = require('express');
const addFront = require('../models/AddSkillFront');
const addBack = require('../models/AddSkillBack');
const addWorkFlow = require('../models/AddSkillWorkFlow');
const router = Router();

router.get('/admin', (req, res) => {
	const obj = {
		title: 'Admin',
		...req.app.locals.settings
	};
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
							res.render('pages/admin', obj);
						})
				})
		})
});

async function saveData(schema, req, res) {
	const colection = new schema({
		chapter: req.body.chapter,
		name: req.body.name,
		keyname: req.body.keyname,
		persent: req.body.persent
	})
	return colection.save(
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
}

addFront.find({}).lean().then(function (records) {
	records.forEach(function (record) {
		console.log(record.name);
	});
});

router.post('/adminapi/add_skill_front', (req, res) => saveData(addFront, req, res));
router.post('/adminapi/add_skill_back', (req, res) => saveData(addBack, req, res));
router.post('/adminapi/add_skill_workflow', (req, res) => saveData(addWorkFlow, req, res));


module.exports = router;