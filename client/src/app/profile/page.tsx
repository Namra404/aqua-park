import { Page } from '~/shared/ui/page';

import logo from '../../../public/avatar.png';
import { ProfileOrdersTotal } from '~/widgets/(profile)/profile-orders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/tabs';
import { Text } from '~/shared/ui/text';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { OrderService } from '~/entities/order/api';
import { redirect } from 'next/navigation';
import { ROUTER } from '~/shared/config/router';
import { PromoCodeForm } from '~/entities/promo-code/ui/promo-code-form';

export const handleGetHistoryOrders = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	if (!token) {
		redirect(ROUTER.pages.HOME);
		return { orders: [] };
	}

	const orderService = new OrderService();
	try {
		const response = await orderService.getCart('забронирован', {
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

const getUserProfile = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');
	const data = cookiesStorage.get('aqua-park-user-data');

	const user = JSON.parse(data?.value!) as auth.User;

	return user;
};

export default async function Profile() {
	const { orders } = await handleGetHistoryOrders();
	const profile = await getUserProfile();
	return (
		<Page className={'max-w-[1200px]'}>
			<div className={'flex justify-center'}>
				<Tabs
					defaultValue='history'
					className='flex justify-center'
				>
					<TabsList className={'relative w-[200] bg-[#191A38] flex flex-col h-full justify-start items-stretch mr-10'}>
						<TabsTrigger value='history'>История заказов</TabsTrigger>
						{profile.role === 'admin' && <TabsTrigger value='promocode'>Промокод</TabsTrigger>}
						<div className={'absolute flex justify-between items-center bottom-2'}>
							<Image
								className={'bg-white rounded-full'}
								src={logo}
								alt={'not found'}
								width={40}
								height={40}
							/>
							<Text
								className={'text-lg ml-5'}
								white
							>
								{profile.name}
							</Text>
						</div>
					</TabsList>
					<TabsContent value='history'>
						<ProfileOrdersTotal orders={orders} />
					</TabsContent>
					<TabsContent value='promocode'>
						<PromoCodeForm />
					</TabsContent>
				</Tabs>
			</div>
		</Page>
	);
}
