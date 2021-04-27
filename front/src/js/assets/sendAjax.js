export default function (url, data, method, cb) {
	axios({ method, url, data })
		.then(res => cb(res.data.status))
		.catch(cb => cb('Вибачте в даних помилка'))
}