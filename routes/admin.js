const { Router } = require('express');
const addFront = require('../models/AddSkillFront');
const addBack = require('../models/AddSkillBack');
const addWorkFlow = require('../models/AddSkillWorkFlow');
const isAuth = require('../middleware/isAuth');
const router = Router();

router.get('/admin', isAuth, async (req, res) => {
	try {
		const obj = {
			title: 'Admin',
			...req.app.locals.settings
		};

		//отримуємо дані з бази
		await addFront
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
							});
					});
			});
	} catch (e) {
		res.status(500).json({ message: 'Щось пішло не так: ' + e });
	};
});

async function saveData(schema, req, res) {
	try {
		//вимагаємо наявності розділу, імені, ключа та відсотку вміння
		if (!req.body.chapter || !req.body.name || !req.body.keyname || !req.body.persent) {
			//якщо щось не вказано - повідомлюємо про це
			return res.json({ message: 'Вкажіть дані!' });
		}

		const colection = new schema({
			chapter: req.body.chapter,
			name: req.body.name,
			keyname: req.body.keyname,
			persent: req.body.persent
		});

		await colection.save();

		res.json({ message: 'Дані успішно додані' });
	} catch (e) {
		res.status(500).json({ message: 'При додаванні даних виникла помилка: ' + e });
	};
};

router.post('/adminapi/add_skill_front', async (req, res) => saveData(addFront, req, res));
router.post('/adminapi/add_skill_back', async (req, res) => saveData(addBack, req, res));
router.post('/adminapi/add_skill_workflow', async (req, res) => saveData(addWorkFlow, req, res));

router.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) throw err;
		res.redirect("/");
	});
});


module.exports = router;