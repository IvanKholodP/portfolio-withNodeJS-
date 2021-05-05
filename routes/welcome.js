const { Router } = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = Router();


router.get('/', (req, res) => {
	res.render('pages/home', { title: 'Welcome' });
});

router.post('/regapi/registration', [
	check('login')
		.exists()
		.trim()
		.isLength({ min: 5 }),
	check('password')
		.exists()
		.trim()
		.isLength({ min: 5 })
], async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.json({ message: 'Мінімальна довжина логіна та пароля 5 символів' })
		};
		const { login, password } = req.body;

		let admin = await User.findOne({ login });
		if (admin) {
			return res.json({ message: "Користувач з даним логіном уже існує" })
		}

		const hashPass = await bcrypt.hash(password, 10);

		admin = new User({
			login,
			password: hashPass
		});

		await admin.save();

		res.json({ message: "Користувач добавлений" })

	} catch (e) {
		return res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
	};
});

router.post('/authapi/authentication', [
	check('login')
		.exists()
		.trim()
		.isLength({ min: 5 }),
	check('password')
		.exists()
		.trim()
		.isLength({ min: 5 })
], async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.json({ message: 'Мінімальна довжина логіна та пароля 5 символів' })
		};

		const { login, password } = req.body;

		const admin = await User.findOne({ login });
		if (!admin) {
			return res.json({ message: "Користувача з даним логіном не існує" });
		}

		const isMatch = await bcrypt.compare(password, admin.password);

		if (!isMatch) {
			return res.json({ message: "Дані введено не вірно", status: false });
		}
		req.session.isAuth = true;
		console.log(req.session)
		res.json({ path: '/admin', message: "Вітаю", status: true })
	} catch (e) {
		res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
	}
})

module.exports = router;