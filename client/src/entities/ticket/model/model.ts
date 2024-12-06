'use server';

import { ROUTER } from '~/shared/config/router';
import { TicketService } from '../api';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteTicket = async (ticketId: number) => {
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');
	console.log(ticketId, token);

	if (!token) {
		return;
	}
	const ticketService = new TicketService();
	try {
		await ticketService.remove(ticketId, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token.value}`
			}
		});
		revalidatePath(ROUTER.pages.CART);
	} catch (error) {
		console.log(error);
	}
};
