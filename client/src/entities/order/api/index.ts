import { api } from '~/shared/lib/request';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

export class OrderService {
	createOrder(order: order.CreateParams) {
		return api.fetch.post<order.CreatedOrder>('/orders', order);
	}

	getCart(status: ticket.Status, config?: AxiosRequestConfig) {
		return api.fetch.get<order.Cart>(`/orders`, {
			...config,
			params: {
				status
			},
			paramsSerializer: params => qs.stringify(params, { encode: true })
		});
	}

	getOrders(status: ticket.Status) {
		return api.fetch.get<order.Cart>(`/orders`, {
			params: {
				status
			},
			paramsSerializer: params => qs.stringify(params, { encode: true })
		});
	}
}
