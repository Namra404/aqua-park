import { cookies } from 'next/headers';
import { CartItem } from '~/entities/cart/ui/cart';
import { OrderService } from '~/entities/order/api';
import { Button } from '~/shared/ui/button';
import { Page } from '~/shared/ui/page';
import { Text } from '~/shared/ui/text';

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

export default async function Cart() {
	const tickets = await handleGetCart();
	const totalPrice = tickets.orders.reduce((acc, item) => {
		acc += +item.total_price;
		return acc;
	}, 0);
	return (
		<Page className='!max-w-[1200px] w-full'>
			<Text type='tittle'>Корзина</Text>
			<div className='flex gap-6 pt-3'>
				<div className='grid grid-cols-1 gap-3 w-3/4'>
					{tickets.orders.map(order => (
						<CartItem
							key={order.id}
							ticket={order.tickets[0]}
						/>
					))}
				</div>
				<div className='w-1/4 p-3 border border-gray-300 rounded-2xl flex flex-col gap-3 max-h-80'>
					<Text type='subtitle'>Итого: {totalPrice}</Text>
					<Text>Товаров в корзине: {tickets.orders.length}</Text>
					<Button className='mt-auto'>Оформить заказ</Button>
				</div>
			</div>
		</Page>
	);
}
