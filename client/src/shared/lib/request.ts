import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIE_USER_KEY } from '~/entities/auth/model/model';

export module api {
	export const fetch = axios.create({
		baseURL: 'http://localhost:8000/api',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	});

	fetch.interceptors.request.use(config => {
		const token = Cookies.get(COOKIE_USER_KEY);

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	});

	fetch.interceptors.response.use(res => {
		console.debug(`${res.config.method?.toUpperCase()} ${res.status}`, res.data);

		return res;
	});
}
