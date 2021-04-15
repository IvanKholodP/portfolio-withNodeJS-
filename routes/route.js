const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.render('pages/home', { title: 'Welcome' });
});

router.get('/about', (req, res) => {
	res.render('pages/about', { title: 'About' });
});

router.get('/admin', (req, res) => {
	res.render('pages/admin', { title: 'Admin' });
});

module.exports = router;