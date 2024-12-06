import { api } from '~/shared/lib/request';
import qs from 'qs';

export class OrderService {
	createOrder(order: order.CreateParams) {
		return api.fetch.post<void>('/orders', order);
	}

	getCart(status: ticket.Status) {
		return api.fetch.get<order.Cart>(`/orders`, {
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
