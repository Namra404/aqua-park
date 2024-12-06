import { api } from '~/shared/lib/request';

export class AuthService {
	async login(params: auth.LoginParams) {
		return api.fetch.post<auth.AuthResponse>('/login', params);
	}

	async register(params: auth.RegisterParams) {
		return api.fetch.post<auth.AuthResponse>('/register', {
			name: params.name,
			email: params.email,
			password: params.password,
			password_confirmation: params.password
		});
	}
}
