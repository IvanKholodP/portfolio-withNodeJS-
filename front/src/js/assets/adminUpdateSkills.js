import prepareSend from './prepareSend';

const formSkill = document.querySelector('#admin-about-me');

if (formSkill) {
	formSkill.addEventListener('submit', (e) => {
		e.preventDefault();

		const { elements } = formSkill;
		const data = []

		for (let i = 0; i < elements.length; i++) {
			const formElement = elements[i]
			const { name } = formElement

			if (name) {
				const { value } = formElement

				data.push({
					keyname: name,
					persent: value
				})
			}
		}
		prepareSend('/adminapi/update_skill', formSkill, data, 'PUT');
	});
};
