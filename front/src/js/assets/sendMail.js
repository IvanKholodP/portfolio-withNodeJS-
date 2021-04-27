import prepareSend from './prepareSend';

const formMail = document.querySelector('#mail');

if (formMail) {
	formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
	e.preventDefault();

	const data = {
		name: formMail.name.value,
		email: formMail.email.value,
		text: formMail.text.value
	};

	prepareSend('/worksapi/send_mail', formMail, data, 'POST');
}