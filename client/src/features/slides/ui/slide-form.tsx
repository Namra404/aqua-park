'use client';
import images from '../../../../public/Card.png';

import style from './style.module.scss';
import { Text } from '~/shared/ui/text';
import { Button } from '~/shared/ui/button';
import Image from 'next/image';
import { toast } from '~/shared/lib/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ROUTER } from '~/shared/config/router';
import { OrderService } from '~/entities/order/api';
import moment from 'moment';
import { Input } from '~/shared/ui/input';
import { useState } from 'react';
import { Switch } from '~/shared/ui/switch';

export const SlideForm = (props: slide.SlideDto) => {
	const { image, name, description, category, id } = props;
	const router = useRouter();
	const [promoCode, setPromoCode] = useState<string>('');
	const [isDayTarif, setDayTarif] = useState<boolean>(true);

	const handleAddToCart = async () => {
		try {
			const orderService = new OrderService();

			const { data } = await orderService.createOrder({
				promo_code: promoCode ?? '',
				tickets: [
					{
						date: moment().format('YYYY-MM-DD'),
						price: isDayTarif ? '500' : '1000',
						slide_id: id!,
						status: 'не забронирован',
						type: 'до 12'
					}
				]
			});

			toast({
				variant: 'default',
				title: 'Корзина',
				description: 'Перейдите в корзину, чтобы подтвердить бронь',
				onClick: () => router.push(ROUTER.pages.CART)
			});
			setPromoCode('');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={style.slide_form}>
			<div className={style.form_title}>
				<Image
					className={'relative w-[800px] max-h-[350] h-full object-cover rounded-xl'}
					src={image || images}
					alt='Изображение'
					width={100}
					height={100}
					priority
				/>
				<Text
					className={'absolute bottom-4 left-3'}
					type={'subtitle'}
				>
					{name}
				</Text>
			</div>
			<div className={'p-4 overflow-hidden'}>
				<Text type={'small'}>{description}</Text>
			</div>
			<div className='flex gap-2'>
				<Switch
					checked={isDayTarif}
					onCheckedChange={setDayTarif}
				/>
				{isDayTarif ? 'Дневной тариф до 12' : 'Вечерний тариф после 12'}
			</div>
			<Text
				className={'p-4'}
				type={'small-bold'}
			>
				Возрастная кагетория: {category}
			</Text>
			<Input
				value={promoCode}
				onChange={e => setPromoCode(e.target.value)}
				placeholder='Введите промокод'
			/>

			<Button
				className={'max-w-[150px] w-full absolute right-4 bottom-4'}
				onClick={handleAddToCart}
			>
				Забронировать
			</Button>
		</div>
	);
};
