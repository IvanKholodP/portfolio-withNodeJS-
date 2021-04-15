const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
	list: {
		type: Number,
		required: [true, 'Вкажіть номер статті']
	},
	title: {
		type: String,
		required: [true, 'Вкажіть заголовок статті']
	},
	date: {
		type: String,
		required: [true, 'Вкажіть дату статті']
	},
	text: {
		type: String,
		required: [true, 'Вкажіть вміст статті']
	}
})

module.exports = model('Blog', blogSchema);