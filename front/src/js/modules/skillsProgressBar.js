'use strict'

const circles = document.querySelectorAll('.skills__circle-above');
if (circles.length > 0) {
	circles.forEach(function (circle) {
		const radius = circle.r.baseVal.value;
		const circumference = 2 * Math.PI * radius;
		circle.style.strokeDasharray = `${circumference} ${circumference}`;
		circle.style.strokeDashoffset = circumference;
		function setProgress(persent) {
			let offset = circumference - persent / 100 * circumference;
			circle.style.strokeDashoffset = offset;
		}
		console.log(circumference)
		setProgress(99)
	})
}


	// if (!circle) return
	// const radius = circle.r.baseVal.value;
	// const circumference = 2 * Math.PI * radius;
	// const skillInput = document.querySelector('#hahah');

	// skillInput.addEventListener('change', function () {
	// 	setProgress(skillInput.value)
	// })

	// circle.style.strokeDasharray = `${circumference} ${circumference}`;
	// circle.style.strokeDashoffset = circumference;

	// function setProgress(persent) {
	// 	let offset = circumference - persent / 100 * circumference;
	// 	circle.style.strokeDashoffset = offset;
	// }

	// setProgress(50)
	// console.log(skillInput)