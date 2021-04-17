const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.render('pages/home', { title: 'Welcome' });
});


module.exports = router;