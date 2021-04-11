export default function (url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.onload = function (e) {
		let result;
		try {
			result = JSON.parse(xhr.responseText);
		} catch (e) {
			cb('Вибачте в даних помилка');
		}
		cb(result.status);
	};
	xhr.send(JSON.stringify(data));
}