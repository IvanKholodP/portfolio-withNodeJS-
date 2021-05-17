const { Schema, model } = require('mongoose');

const addWorkFlow = new Schema({
	chapter: String,
	name: String,
	keyname: String,
	persent: Number
});

module.exports = model('AddSkillWorkFlow', addWorkFlow);