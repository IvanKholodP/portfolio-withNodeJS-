const { Schema, model } = require('mongoose');

const userShema = new Schema({
	login: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	}
});

module.exports = model('User', userShema)
