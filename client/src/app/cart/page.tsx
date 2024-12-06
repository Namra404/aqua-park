import { CartItem } from '~/entities/cart/ui/cart';
import { Button } from '~/shared/ui/button';
import { Page } from '~/shared/ui/page';
import { Text } from '~/shared/ui/text';

const handleGetCart = async () => {
	return Promise.resolve({
		data: [
			{
				id: 1
			},
			{
				id: 2
			},
			{
				id: 3
			}
		] as ticket.TicketDto[],
		status: 200
	});
};

export default async function Cart() {
	const tickets = await handleGetCart();
	return (
		<Page className='!max-w-[1200px] w-full'>
			<Text type='tittle'>Корзина</Text>
			<div className='flex gap-6 pt-3'>
				<div className='grid grid-cols-1 gap-3 w-3/4'>
					{tickets.data.map(ticket => (
						<CartItem
							key={ticket.id}
							ticket={ticket}
						/>
					))}
				</div>
				<div className='w-1/4 p-3 border border-gray-300 rounded-2xl flex flex-col gap-3 max-h-80'>
					<Text type='subtitle'>Итого</Text>
					<Text>Товаров в корзине: {tickets.data.length}</Text>
					<Button className='mt-auto'>Оформить заказ</Button>
				</div>
			</div>
		</Page>
	);
}
