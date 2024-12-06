'use client';
import { atom } from 'nanostores';
import { LoginFormType, RegisterFormType } from '~/features/auth/model/schema';
import { AuthService } from '../api';
import Cookies from 'js-cookie';

export const COOKIE_USER_KEY = 'aqua-park-user';

export class AuthStorage {
	private constructor(private readonly authService: AuthService) {}

	COOKIE_USER_KEY = COOKIE_USER_KEY;
	private _status = atom<boolean>(true);

	get status() {
		return this._status;
	}

	sync() {
		try {
			const user = JSON.parse(Cookies.get(this.COOKIE_USER_KEY) ?? '');
			if (user) {
				this._status.set(true);
			}
		} catch {
			this.logout();
		}
	}

	async login(values: LoginFormType) {
		try {
			const response = await this.authService.login(values);
			this._status.set(true);
			Cookies.set(this.COOKIE_USER_KEY, JSON.stringify(response.data));
		} catch (e) {
			console.error(e);
		}
	}
	async register(values: RegisterFormType) {
		try {
			const response = await this.authService.register(values);
			this._status.set(true);
			Cookies.set(this.COOKIE_USER_KEY, JSON.stringify(response.data));
		} catch (e) {
			console.error(e);
		}
	}
	async logout() {
		this._status.set(false);
	}

	static instance = new AuthStorage(new AuthService());
}
