import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { OrderService } from '~/entities/order/api';
import { TicketService } from '~/entities/ticket/api';
import { ROUTER } from '~/shared/config/router';
import { Page } from '~/shared/ui/page';
import { Text } from '~/shared/ui/text';
import { PaymentForm } from './form';

const handleGetCart = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	if (!token) {
		return { orders: [] };
	}

	const orderService = new OrderService();
	try {
		const response = await orderService.getCart('не забронирован', {
			headers: {
				Authorization: `Bearer ${token.value}`,
				Accept: 'application/json'
			}
		});

		return response.data;
	} catch (error) {
		return { orders: [] };
	}
};

const handleSubmitOrder = async (ticketsId: number[]) => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	if (!token) {
		return;
	}

	const ticketService = new TicketService();
	for (const ticketId of ticketsId) {
		await ticketService.updateStatus(ticketId, 'забронирован', {
			headers: {
				Authorization: `Bearer ${token.value}`,
				Accept: 'application/json'
			}
		});
	}
	revalidatePath(ROUTER.pages.HOME);
};

export default async function Paymanet() {
	const cart = await handleGetCart();

	return (
		<Page>
			<Text type='tittle'>Оплата</Text>
			<PaymentForm
				handleSubmitOrder={handleSubmitOrder}
				cart={cart}
			/>
		</Page>
	);
}
