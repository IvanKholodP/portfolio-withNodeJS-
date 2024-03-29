import prepareSend from './prepareSend';

const addskill = document.querySelector('#admin-add__skill');

if (addskill) {
	addskill.addEventListener('submit', (e) => {
		e.preventDefault();

		const data = {
			chapter: addskill.skillList.value,
			name: addskill.name.value,
			keyname: addskill.keyname.value,
			persent: addskill.persent.value
		}

		if (data.chapter == "front") {
			prepareSend('/adminapi/add_skill_front', addskill, data, 'POST');
		} else if (data.chapter == "back") {
			prepareSend('/adminapi/add_skill_back', addskill, data, 'POST');
		} else {
			prepareSend('/adminapi/add_skill_workflow', addskill, data, 'POST');
		}
	});
};

const removeSkill = document.querySelector('#admin-remove__skill');

if (removeSkill) {
	removeSkill.addEventListener('submit', (e) => {
		e.preventDefault();

		const data = {
			id: removeSkill.skillName.value
		};
		prepareSend('/adminapi/remove_skill', removeSkill, data, 'DELETE');
	});
};
