const { Router } = require('express');
const upload = require('../middleware/upload');
const Message = require('../models/Message');
const Picture = require('../models/Picture');
const router = Router();
const nodemailer = require('nodemailer');
const config = require('../config/production');


router.get('/works', async (req, res) => {
	try {
		let obj = {
			title: 'Works'
		};
		Object.assign(obj, req.app.locals.settings);
		await Picture
			.find({})
			.then(items => {
				Object.assign(obj, { items });
				res.render('pages/works', obj);
			});
	} catch (e) {
		res.status(500).json({ message: 'Щось пішло не так: ' + e });
	}
});

router.post('/worksapi/send_mail', async (req, res) => {
	try {
		//вимагаємо наявності імені, зворотньої пошти та текста повідомлення
		if (!req.body.name || !req.body.email || !req.body.text) {
			//якщо щось не вказано - повідомлюємо про це
			return res.json({ message: 'Введіть дані' });
		}

		const sendMailToDatabase = new Message({
			name: req.body.name,
			email: req.body.email,
			body: req.body.text,
			date: new Date()
		})

		await sendMailToDatabase.save();

		//ініціюємо модуль для відправки повідомлень
		const transporter = nodemailer.createTransport({
			service: "gmail",
			// host: 'smtp.gmail.com',
			// port: 465,
			// secure: true,
			auth: {
				type: "OAuth2",
				user: process.env.EMAIL,
				// pass: "worldof1991!"
				// accessToken: "ya29.a0AfH6SMAiLzpxgtSxHXWO-p0NDN64EZc9f1DwIC33ROgAGAwT08MrnUNODbPMHT-ASXOTe9Crh9Z_blaIlgeCJK_91EcDqiGG5IH7gQoxXmMX8MoSxtXsIBNlTBA_xgDmGwsg8nlhfkKYYtLGRZ-e99j9FjyX",
				// expires: 1622841783977 + 60000,
				clientId: process.env.EMAIL_CLIENT_ID,
				clientSecret: process.env.EMAIL_CLIENT_SECRET,
				refreshToken: process.env.EMAIL_REFRESH_TOKEN,
				// accessUrl: "https://oauth2.googleapis.com/token"
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
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res.json({ message: 'При відправці повідомлення виникла помилка' + error });
			}
			res.json({ message: 'Повідомлення успішно надіслано' });
		});
	} catch (e) {
		res.json({ message: 'Щось пішло не так, спробуйте ще раз' });
	};
});

router.post('/worksapi/addslider', upload.single('slideImage'), async (req, res) => {
	try {
		if (!req.body.link || !req.file) {
			//якщо щось не вказано - повідомлюємо про це
			return res.json({ message: 'Введіть дані' });
		};
		const slider = new Picture({
			name: req.body.link,
			imageSrc: req.file.path
		});

		await slider.save();

		res.json({ message: 'Слайд успішно добавлено' });
	} catch (e) {
		res.json({ message: 'Щось пішло не так, спробуйте ще раз' });
	};
});

router.delete('/worksapi/removeslider', async (req, res) => {
	try {
		if (req.body.name == "false") {
			return res.json({ message: 'Виберіть роботу' });
		};
		const sliderId = req.body.name;

		await Picture.deleteOne({ _id: sliderId });

		res.json({ message: 'Слайд успішно видалено' });
	} catch (e) {
		res.json({ message: 'Щось пішло не так, спробуйте ще раз' });
	};
});

module.exports = router;