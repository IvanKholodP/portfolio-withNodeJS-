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
		console.log(data)
		console.log(typeof (data.chapter))
		if (data.chapter == "front") {
			prepareSend('/adminapi/add_skill_front', addskill, data);
		} else if (data.chapter == "back") {
			prepareSend('/adminapi/add_skill_back', addskill, data);
		} else {
			prepareSend('/adminapi/add_skill_workflow', addskill, data);
		}
		// prepareSend('/adminapi/add_skill_front', addskill, data);
	})
}
