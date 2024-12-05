'use client';
import { atom } from 'nanostores';
import { LoginFormType, RegisterFormType } from '~/features/auth/model/schema';

export class AuthStorage {
	private constructor() {}

	private _status = atom<boolean>(true);

	get status() {
		return this._status;
	}

	async login(values: LoginFormType) {}
	async register(values: RegisterFormType) {}
	async logout() {}

	static instance = new AuthStorage();
}
