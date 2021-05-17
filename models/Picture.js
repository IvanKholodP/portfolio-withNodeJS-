const { Schema, model } = require('mongoose');

const picSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Вкажіть посилання роботи']
	},
	imageSrc: {
		type: String,
		required: [true, 'Вкажіть зображення роботи']
	}
});

module.exports = model('Picture', picSchema);