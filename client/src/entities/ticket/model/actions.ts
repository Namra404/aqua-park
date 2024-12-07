'use server';

import { ROUTER } from '~/shared/config/router';
import { TicketService } from '../api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const addServiceToTicket = async (ticketId: number, serviceId: number) => {
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	if (!token) {
		return;
	}

	const ticketService = new TicketService();
	await ticketService.create(
		{
			service_id: serviceId,
			ticket_id: ticketId
		},
		{
			headers: {
				Authorization: `Bearer ${token.value}`,
				Accept: 'application/json'
			}
		}
	);
	revalidatePath(ROUTER.pages.HOME);
	revalidatePath(ROUTER.pages.PROFILE);
};
