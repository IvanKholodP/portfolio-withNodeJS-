const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const routeExp = require('./routes/route');
const works = require('./routes/works');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(routeExp);


app.use(express.static(__dirname + '/front/build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(works);

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

const PORT = config.get('port') || 3000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUrl'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start();