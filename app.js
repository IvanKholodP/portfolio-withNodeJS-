const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const routeExp = require('./routes/route');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(routeExp);
app.use(express.static(__dirname + '/front/build'));

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
