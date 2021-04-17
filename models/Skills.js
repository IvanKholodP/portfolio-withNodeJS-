const { Schema, model } = require('mongoose');

const skillSchema = new Schema({
	html5: {
		type: Number,
		required: [false]
	},
	css3: {
		type: Number,
		required: [false]
	},
	js: {
		type: Number,
		required: [false]
	},
	sass: {
		type: Number,
		required: [false]
	},
	sql: {
		type: Number,
		required: [false]
	},
	node: {
		type: Number,
		required: [false]
	},
	mongo: {
		type: Number,
		required: [false]
	},
	git: {
		type: Number,
		required: [false]
	},
	webpack: {
		type: Number,
		required: [false]
	},
	avocode: {
		type: Number,
		required: [false]
	},
	rest: {
		type: Number,
		required: [false]
	}
})

module.exports = model('Skills', skillSchema)