'use client';
import { atom } from 'nanostores';
import { LoginFormType, RegisterFormType } from '~/features/auth/model/schema';
import { AuthService } from '../api';
import Cookies from 'js-cookie';
import { revalidatePath } from 'next/cache';
import { ROUTER } from '~/shared/config/router';
import { updatePages } from './actions';

export const COOKIE_USER_KEY = 'aqua-park-user';

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
			Cookies.set(this.COOKIE_USER_KEY, response.data.token);
			await updatePages();
		} catch (e) {
			console.error(e);
		}
	}
	async register(values: RegisterFormType) {
		try {
			const response = await this.authService.register(values);
			this._status.set(true);
			Cookies.set(this.COOKIE_USER_KEY, response.data.token);
			await updatePages();
		} catch (e) {
			console.error(e);
		}
	}
	async logout() {
		this._status.set(false);
		Cookies.remove(this.COOKIE_USER_KEY);
		await updatePages();
	}

	static instance = new AuthStorage(new AuthService());
}
