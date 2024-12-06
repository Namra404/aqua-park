import { api } from '~/shared/lib/request';

export class TicketService {
	create(ticketService: ticket.TicketServiceParams) {
		return api.fetch.post('ticket-service', ticketService);
	}
}
