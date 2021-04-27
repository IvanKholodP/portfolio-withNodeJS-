const { Router } = require('express');
const Message = require('../models/Message');
const router = Router();
const nodemailer = require('nodemailer');
const config = require('../config/production');


router.get('/works', (req, res) => {
	res.render('pages/works', { title: 'Works' });
});

router.post('/worksapi/send_mail', async (req, res) => {
	//вимагаємо наявності імені, зворотньої пошти та текста повідомлення
	if (!req.body.name || !req.body.email || !req.body.text) {
		//якщо щось не вказано - повідомлюємо про це
		return res.json({ status: 'Введіть дані' });
	}

	const sendMailToDatabase = new Message({
		name: req.body.name,
		email: req.body.email,
		body: req.body.text,
		date: new Date().setUTCHours(12)
	})

	await sendMailToDatabase.save()

	//ініціюємо модуль для відправки повідомлень
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.gom",
		port: 465,
		secure: true,
		auth: {
			user: config.auth.user,
			pass: config.auth.pass
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	const mailOptions = {
		from: `"${req.body.name}" <${req.body.email}>`,
		to: config.auth.user,
		subject: config.subject,
		text: req
			.body
			.text
			.trim()
			.slice(0, 500) + `\n Відправлено з: <${req.body.email}>`
	};

	//відправляємо пошту
	await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.json({ status: 'При відправці повідомлення виникла помилка' });
		}
		res.json({ status: 'Повідомлення успішно надіслано' });
	});

});


module.exports = router;