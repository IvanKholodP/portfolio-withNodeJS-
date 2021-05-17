const { Router } = require('express');
const addFront = require('../models/AddSkillFront');
const addBack = require('../models/AddSkillBack');
const addWorkFlow = require('../models/AddSkillWorkFlow');
const router = Router();


router.get('/about', async (req, res) => {
	try {
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
							});
					});
			});
	} catch (e) {
		res.status(500).json({ message: 'Щось пішло не так: ' + e });
	};
});

router.put('/adminapi/update_skill', async (req, res) => {
	const data = req.body;
	const errors = [];

	await data.forEach(key => {
		addFront.updateMany({ keyname: `${key.keyname}` }, {
			$set: { persent: `${key.persent}` }
		}, { new: true, multi: true }).catch(error => errors.push(error))

		addBack.updateMany({ keyname: `${key.keyname}` }, {
			$set: { persent: `${key.persent}` }
		}, { new: true, multi: true }).catch(error => errors.push(error))

		addWorkFlow.updateMany({ keyname: `${key.keyname}` }, {
			$set: { persent: `${key.persent}` }
		}, { new: true, multi: true }).catch(error => errors.push(error))
	});

	if (errors.length > 0) {
		return res.json({
			message: 'При оновлені даних виникла помилка: ' + error
		});
	} else {
		return res.json({ message: 'Дані успішно оновлені' });
	};
});


module.exports = router;