'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';

const PaymentSchema = z.object({
	card: z.string(),
	date: z.string(),
	cvv: z.string()
});

type PaymanetType = z.infer<typeof PaymentSchema>;

export const PaymentForm = ({ handleSubmitOrder, cart }: { handleSubmitOrder: any; cart: order.Cart }) => {
	const router = useRouter();
	const form = useForm<PaymanetType>({
		defaultValues: {
			card: '',
			date: '',
			cvv: ''
		}
	});

	const handleSubmit = async (values: PaymanetType) => {
		const paymanetSucces = !!Math.floor(Math.random());
		if (paymanetSucces) {
			await handleSubmitOrder(cart.orders.map(order => order.tickets[0].id));
		} else {
			router.push('/unluck');
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='card'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Номер карты</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите номер карты'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Год выпуска карты через /</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите дату'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='cvv'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Код CVV</FormLabel>
							<FormControl>
								<Input
									placeholder='Код CVV'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Оплатить</Button>
			</form>
		</Form>
	);
};
