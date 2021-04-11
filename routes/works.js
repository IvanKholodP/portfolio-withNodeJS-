const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const configDev = require('../config/dev');




router.get('/works', (req, res) => {
	res.render('pages/works', { title: 'Works' });
});

router.post('/works', function (req, res) {
	console.log(req.body)
	//вимагаємо наявності імені, зворотньої пошти та текста повідомлення
	if (!req.body.name || !req.body.email || !req.body.text) {
		//якщо щось не вказано - повідомлюємо про це
		return res.json({ status: 'Введіть дані' });
	}
	//ініціюємо модуль для відправки повідомлень
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.gom",
		port: 465,
		secure: true,
		auth: {
			user: configDev.auth.user,
			pass: configDev.auth.pass
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	const mailOptions = {
		from: `"${req.body.name}" <${req.body.email}>`,
		to: configDev.auth.user,
		subject: configDev.subject,
		text: req
			.body
			.text
			.trim()
			.slice(0, 500) + `\n Відправлено з: <${req.body.email}>`
	};
	//відправляємо пошту
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return res.json({ status: 'При відправці повідомлення виникла помилка' });
		}
		res.json({ status: 'Повідомлення успішно надіслано' });
	});

});


module.exports = router;