import { atom } from 'nanostores';

export class AuthModalStorage {
	private constructor() {}

	private _opened = atom(false);

	toggle() {
		const isOpen = this._opened.get();

		if (isOpen) {
			return this._opened.set(false);
		}

		return this._opened.set(true);
	}

	open() {
		this._opened.set(true);
	}

	close() {
		this._opened.set(false);
	}

	static instnace = new AuthModalStorage();
}
