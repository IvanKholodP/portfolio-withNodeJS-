import prepareSend from './prepareSend';

const formAuth = document.querySelector('#form-auth');

if (formAuth) {
	formAuth.addEventListener('submit', prepareSendAuth)
}

async function prepareSendAuth(e) {
	e.preventDefault();

	const { login, password, check, radio } = formAuth
	const status = formAuth.querySelector('.status');

	const data = {
		login: login.value,
		password: password.value,
		check: check.checked,
		radio: radio.value
	};

	if (data.check === true && data.radio === "true") {
		const send = await prepareSend('/authapi/authentication', formAuth, data, 'POST');
		if (send.data.status) {
			window.location.href = send.data.path;
		}
	} else if (data.check === false && data.radio === "false") {
		status.innerHTML = "Роботам доступ заборонено))";
	} else if (data.check === true && data.radio === "false") {
		status.innerHTML = "У Вас майже вийшло)";
	} else {
		status.innerHTML = "Доступ заборонено)";
	}
}