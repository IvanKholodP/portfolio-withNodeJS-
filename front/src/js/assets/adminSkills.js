import prepareSend from './prepareSend';

const formSkill = document.querySelector('#admin-about-me');

if (formSkill) {
	formSkill.addEventListener('submit', (e) => {
		e.preventDefault();
		let data = {
			html5: formSkill.html5.value,
			css3: formSkill.css3.value,
			js: formSkill.js.value,
			sass: formSkill.sass.value,
			sql: formSkill.sql.value,
			node: formSkill.node.value,
			mongo: formSkill.mongo.value,
			git: formSkill.git.value,
			webpack: formSkill.webpack.value,
			avocode: formSkill.avocode.value,
			rest: formSkill.rest.value
		}
		console.log(data)
		prepareSend('/admin/addskill', formSkill, data);
	})
}