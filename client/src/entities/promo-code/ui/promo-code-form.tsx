'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/shared/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';
import { PromoCodeService } from '../api';
import moment from 'moment';
import { toast } from '~/shared/lib/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ROUTER } from '~/shared/config/router';

const PromoCodeSchema = z.object({
	code: z.string(),
	discount: z.number()
});
type PromoCodeFormType = z.infer<typeof PromoCodeSchema>;

export const PromoCodeForm = () => {
	const router = useRouter();
	const form = useForm<PromoCodeFormType>({
		defaultValues: {
			code: '',
			discount: 10
		}
	});

	const handleSubmit = async (values: PromoCodeFormType) => {
		const promoCodeService = new PromoCodeService();

		await promoCodeService.create({
			code: values.code,
			discount: values.discount,
			expires_at: moment().add(7, 'days').toISOString()
		});
		toast({
			variant: 'default',
			title: 'Промокод',
			description: `Перейдите к оформлению заказа и примените ваш новый промокод ${values.code}, чтобы получить скидку ${values.discount}%`,
			onClick: () => router.push(ROUTER.pages.HOME)
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='w-[900px] min-h-[400px] shadow-2xl rounded-xl p-4 grid grid-cols-1'
			>
				<FormField
					control={form.control}
					name='code'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Промокод</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите промокод'
									{...field}
								/>
							</FormControl>
							<FormDescription>Введите код, который будет вводить пользователи для скидки</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='discount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Скидка</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите процент скидки'
									{...field}
								/>
							</FormControl>
							<FormDescription>Введите процент скидки, который будет применяться для заказа</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Создать</Button>
			</form>
		</Form>
	);
};
