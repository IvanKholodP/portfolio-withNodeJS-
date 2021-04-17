const { Router } = require('express');
const Skills = require('../models/Skills');
const router = Router();

router.get('/admin', (req, res) => {
	let obj = {
		title: 'Admin'
	};
	Object.assign(obj, req.app.locals.settings);
	//отримуємо дані з бази
	Skills
		.find()
		.then(skill => {
			// обробляємо шаблон і передаємо його в браузер,передаємо в шаблон
			Object.assign(obj, { skill: skill });
			res.render('pages/admin', obj);
		});
});


module.exports = router;