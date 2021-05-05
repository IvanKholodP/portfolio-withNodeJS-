const { Schema, model } = require('mongoose');

const addBack = new Schema({
	chapter: String,
	name: String,
	keyname: String,
	persent: Number
})

module.exports = model('AddSkillBack', addBack)