'use strict'

let skills = document.querySelectorAll('.skills-section__item');
if (skills.length > 0) {
	skills.forEach((skill) => {
		const circle = skill.querySelector('.skills__circle-above');
		const radius = circle.r.baseVal.value;
		let circumference = 2 * Math.PI * radius;
		let data = skill.dataset.skill;
		let offset = parseInt(circumference * (data / 100));
		circle.style.strokeDasharray = `${offset} ${circumference}`;
	});
};