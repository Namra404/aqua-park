import axios from 'axios';

export module api {
	export const fetch = axios.create({
		baseURL: 'http://localhost:8000/api',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	});

	fetch.interceptors.response.use(res => {
		console.debug(`${res.config.method?.toUpperCase()} ${res.status}`, res.data);

		return res;
	});
}
