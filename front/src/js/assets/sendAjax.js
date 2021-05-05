export default async (url, data, method) => {
	const response = await axios({ method, url, data })
	return response
}