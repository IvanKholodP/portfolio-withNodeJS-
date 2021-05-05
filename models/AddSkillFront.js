const { Schema, model } = require('mongoose');

const addFront = new Schema({
	chapter: String,
	name: String,
	keyname: String,
	persent: Number
})

module.exports = model('AddSkillFront', addFront)