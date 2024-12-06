'use client';
import { atom } from 'nanostores';
import { LoginFormType, RegisterFormType } from '~/features/auth/model/schema';
import { AuthService } from '../api';
import Cookies from 'js-cookie';

export class AuthStorage {
	private constructor(private readonly authService: AuthService) {}

  private COOKIE_USER_KEY = 'aqua-park-user'
	private _status = atom<boolean>(true);

	get status() {
		return this._status;
	}

	async login(values: LoginFormType) {
		try {
			const response = await this.authService.login(values);
			this._status.set(true);
      Cookies.set(this.COOKIE_USER_KEY, JSON.stringify(response.data))
		} catch {}
	}
	async register(values: RegisterFormType) {
		try {
			const response = await this.authService.register(values);
			this._status.set(true);
      Cookies.set(this.COOKIE_USER_KEY, JSON.stringify(response.data))
		} catch {}
	}
	async logout() {
		this._status.set(false);
	}

	static instance = new AuthStorage(new AuthService());
}
