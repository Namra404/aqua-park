import { api } from '~/shared/lib/request';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

export class SlideService {
	getSlideReview(slideId: number) {
		return api.fetch.get<slide.Review>('slide-review/', {
			params: {
				slide_id: slideId
			},
			paramsSerializer: params => qs.stringify(params, { encode: true })
		});
	}

	getSlides(config?: AxiosRequestConfig) {
		return api.fetch.get<slide.SlideDto[]>('/slides', config);
	}
}
