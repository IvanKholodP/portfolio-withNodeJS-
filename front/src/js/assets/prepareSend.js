import sendAjaxJson from './sendAjax';

export default function prepareSend(url, form, data, method, cb) {
	let resultContainer = form.querySelector('.status');
	resultContainer.innerHTML = 'Відправка...';
	sendAjaxJson(url, data, method, function (data) {
		form.reset();
		resultContainer.innerHTML = data;
		if (cb) {
			cb(data);
		}
	});
}