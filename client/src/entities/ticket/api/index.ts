import { AxiosRequestConfig } from 'axios';
import { api } from '~/shared/lib/request';

export class TicketService {
	create(ticketService: ticket.TicketServiceParams, config?: AxiosRequestConfig) {
		return api.fetch.post('/ticket-service', ticketService, config);
	}

	remove(ticketId: number, config?: AxiosRequestConfig) {
		return api.fetch.delete(`/tickets/${ticketId}`, config);
	}

	updateStatus(ticketId: number, status: ticket.Status, config?: AxiosRequestConfig) {
		return api.fetch.put(
			`/tickets/${ticketId}`,
			{
				status
			},
			config
		);
	}
}
