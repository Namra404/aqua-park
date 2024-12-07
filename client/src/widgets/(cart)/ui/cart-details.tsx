'use client';
import { useRouter } from 'next/navigation';
import { ROUTER } from '~/shared/config/router';
import { toast } from '~/shared/lib/hooks/use-toast';
import { Button } from '~/shared/ui/button';
import { Text } from '~/shared/ui/text';

export const CartDetails = ({
	productCount,
	totalPrice,
	handleSubmitOrder,
	tickets
}: {
	totalPrice: number;
	productCount: number;
	tickets: order.Cart;
	handleSubmitOrder: (ids: number[]) => Promise<void>;
}) => {
	const router = useRouter();
	return (
		<div className='w-1/4 p-3 border border-gray-300 rounded-2xl flex flex-col gap-3 max-h-80'>
			<Text type='subtitle'>Итого: {totalPrice}</Text>
			<Text>Товаров в корзине: {productCount}</Text>
			<Button
				className='mt-auto'
				onClick={async () => {
					router.push('/payment');
					// await handleSubmitOrder(tickets.orders.map(order => order.tickets[0].id));
					toast({
						variant: 'default',
						title: 'Профиль',
						description: 'Перейдите в профиль, чтобы посмотреть ваши забронированные билеты',
						onClick: () => router.push(ROUTER.pages.PROFILE)
					});
				}}
			>
				Оформить заказ
			</Button>
		</div>
	);
};
