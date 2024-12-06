import { AxiosRequestConfig } from 'axios';
import { api } from '~/shared/lib/request';

export class TicketService {
	create(ticketService: ticket.TicketServiceParams) {
		return api.fetch.post('/ticket-service', ticketService);
	}

	remove(ticketId: number, config?: AxiosRequestConfig) {
		return api.fetch.delete(`/tickets/${ticketId}`, config);
	}
}
