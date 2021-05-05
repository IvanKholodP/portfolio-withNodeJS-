import sendAjaxJson from './sendAjax';

export default async function prepareSend(url, form, data, method) {
	let resultContainer = form.querySelector('.status');
	resultContainer.innerHTML = 'Відправка...';

	const result = await sendAjaxJson(url, data, method);

	form.reset();
	resultContainer.innerHTML = result.data.message;

	return result
}