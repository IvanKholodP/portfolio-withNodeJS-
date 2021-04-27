const { Schema, model } = require('mongoose');

const addMessage = new Schema({
	name: String,
	email: String,
	body: String,
	date: Date,
	required: false,
})

module.exports = model('Message', addMessage)