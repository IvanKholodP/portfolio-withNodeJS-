const { Router } = require('express');
const Blog = require('../models/Blog')
const addFront = require('../models/AddSkillFront');
const addBack = require('../models/AddSkillBack');
const addWorkFlow = require('../models/AddSkillWorkFlow');
const isAuth = require('../middleware/isAuth');
const Picture = require('../models/Picture');
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
				Object.assign(obj, { addSkillFront });
				return addSkillFront;
			}).then(addSkillFront => {
				addBack
					.find({})
					.then(addSkillBack => {
						// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон
						Object.assign(obj, { addSkillBack });
						return addSkillBack
					}).then(addSkillBack => {
						addWorkFlow
							.find({})
							.then(addSkillWorkFlow => {
								Object.assign(obj, { addSkillWorkFlow });
								return addSkillWorkFlow
							}).then(addSkillWorkFlow => {
								Blog
									.find({})
									.then(Blog => {
										// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон список записів в блозі
										Object.assign(obj, { Blog });
										return Blog
									}).then(Blog => {
										Picture
											.find({})
											.then(Picture => {
												Object.assign(obj, { Picture });
												res.render('pages/admin', obj);
											});
									});
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
		if (req.body.chapter == "false" || !req.body.name || !req.body.keyname || !req.body.persent) {
			//якщо щось не вказано - повідомлюємо про це
			return res.json({ message: 'Виберіть дані!' });
		};

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

router.delete('/adminapi/remove_skill', async (req, res) => {
	try {
		if (req.body.id === "false") {
			return res.json({ message: 'Виберіть вміння!' });
		};
		const skillId = req.body.id;

		await addFront.deleteOne({ _id: skillId });

		await addBack.deleteOne({ _id: skillId });

		await addWorkFlow.deleteOne({ _id: skillId });

		res.json({ message: 'Вміння успішно видалено' });
	} catch (e) {
		res.status(500).json({ message: 'При видаленні вміння виникла помилка: ' + e });
	}
})

module.exports = router;