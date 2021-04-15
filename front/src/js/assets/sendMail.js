import prepareSend from './prepareSend';

const formMail = document.querySelector('#mail');

if (formMail) {
	formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
	e.preventDefault();
	let data = {
		name: formMail.name.value,
		email: formMail.email.value,
		text: formMail.text.value
	};
	console.log(data)
	prepareSend('/works', formMail, data);
}