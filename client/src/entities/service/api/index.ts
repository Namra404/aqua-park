import { AxiosRequestConfig } from 'axios';
import { api } from '~/shared/lib/request';

export class AdditionalService {
	getServices(config?: AxiosRequestConfig) {
		return api.fetch.get<service.ServiceDto[]>('/service', config);
	}
}
