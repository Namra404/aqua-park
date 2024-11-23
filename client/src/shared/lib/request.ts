import axios from 'axios';

export module api {
	export const fetch = axios.create({
		baseURL: process.env.API_URL,
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
