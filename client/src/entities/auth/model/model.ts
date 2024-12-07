'use client';
import { atom } from 'nanostores';
import { LoginFormType, RegisterFormType } from '~/features/auth/model/schema';
import { AuthService } from '../api';
import Cookies from 'js-cookie';
import { updatePages } from './actions';

export const COOKIE_USER_KEY = 'aqua-park-user';
export const AUTH_USER = 'aqua-park-user-data';

export class AuthStorage {
	private constructor(private readonly authService: AuthService) {}

	COOKIE_USER_KEY = COOKIE_USER_KEY;
	private _status = atom<boolean>(true);

	get status() {
		return this._status;
	}

	sync() {
		const user = Cookies.get(COOKIE_USER_KEY);
		if (user) {
			this._status.set(true);
		} else {
			this.logout();
		}
	}

	async login(values: LoginFormType) {
		try {
			const response = await this.authService.login(values);
			this._status.set(true);
			Cookies.set(this.COOKIE_USER_KEY, response.data.token, {
				expires: 1 * 60 * 60 * 60
			});
			Cookies.set(AUTH_USER, JSON.stringify(response.data.user), {
				expires: 1 * 60 * 60 * 60
			});
			await updatePages();
		} catch (e) {
			console.error(e);
		}
	}
	async register(values: RegisterFormType) {
		try {
			const response = await this.authService.register(values);
			this._status.set(true);
			Cookies.set(this.COOKIE_USER_KEY, response.data.token, {
				expires: 1 * 60 * 60 * 60
			});
			Cookies.set(AUTH_USER, JSON.stringify(response.data.user), {
				expires: 1 * 60 * 60 * 60
			});
			await updatePages();
		} catch (e) {
			console.error(e);
		}
	}
	async logout() {
		this._status.set(false);
		Cookies.remove(this.COOKIE_USER_KEY);
		Cookies.remove(AUTH_USER);
		await updatePages();
	}

	static instance = new AuthStorage(new AuthService());
}
