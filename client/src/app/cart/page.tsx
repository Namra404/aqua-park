import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { CartItem } from '~/entities/cart/ui/cart';
import { OrderService } from '~/entities/order/api';
import { AdditionalService } from '~/entities/service/api';
import { TicketService } from '~/entities/ticket/api';
import { ROUTER } from '~/shared/config/router';
import { Button } from '~/shared/ui/button';
import { Page } from '~/shared/ui/page';
import { Text } from '~/shared/ui/text';
import { CartDetails } from '~/widgets/(cart)/ui/cart-details';

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

const handleGetServices = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	if (!token) {
		return [];
	}

	const additionalService = new AdditionalService();
	try {
		const response = await additionalService.getServices({
			headers: {
				Authorization: `Bearer ${token.value}`,
				Accept: 'application/json'
			}
		});

		return response.data;
	} catch (error) {
		return [];
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

export default async function Cart() {
	const tickets = await handleGetCart();
	const totalPrice = tickets.orders.reduce((acc, item) => {
		acc += +item.total_price;
		return acc;
	}, 0);
	const services = await handleGetServices();

	console.log('services', services);

	return (
		<Page className='!max-w-[1200px] w-full'>
			<Text type='tittle'>Корзина</Text>
			<div className='flex gap-6 pt-3'>
				<div className='grid grid-cols-1 gap-3 w-3/4'>
					{tickets.orders.map(order => (
						<CartItem
							key={order.id}
							ticket={order.tickets[0]}
							services={services}
						/>
					))}
				</div>
				<CartDetails
					totalPrice={totalPrice}
					productCount={tickets.orders.length}
					handleSubmitOrder={handleSubmitOrder}
					tickets={tickets}
				/>
			</div>
		</Page>
	);
}
