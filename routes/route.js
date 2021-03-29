const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.render('pages/home', { title: 'Welcome' });
});

// router.get('/auth', (req, res) => {
// 	res.render('pages/auth', { title: 'Auth' });
// });

router.get('/blog', (req, res) => {
	res.render('pages/blog', { title: 'Blog' });
});

router.get('/about', (req, res) => {
	res.render('pages/about', { title: 'About' });
});

module.exports = router;