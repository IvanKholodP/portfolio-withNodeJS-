const express = require('express');
const session = require('express-session');
const config = require('config');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const welcome = require('./routes/welcome');
const works = require('./routes/works');
const blog = require('./routes/blog');
const about = require('./routes/about');
const admin = require('./routes/admin');
const configProd = require('./config/production');
const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(__dirname + '/front/build'));
app.use(express.static(__dirname + ''));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
	uri: configProd.mongoUrl,
	collection: 'mySessions'
});

app.use(session({
	secret: configProd.secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60  // 1 hour
	},
	store: store,
}))

app.use(works);
app.use(blog);
app.use(about);
app.use(admin);
app.use(welcome);

// 404 catch-all handler (middleware)
app.use((req, res, next) => {
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

const PORT = config.get('port') || 3000;

async function start() {
	try {
		await mongoose.connect(configProd.mongoUrl, {
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