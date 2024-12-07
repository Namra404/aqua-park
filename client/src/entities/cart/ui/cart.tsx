'use client';
import { Plus, X } from 'lucide-react';
import { deleteTicket } from '~/entities/ticket/model/model';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/shared/ui/dialog';
import { Text } from '~/shared/ui/text';
import { addServiceToTicket } from '~/entities/ticket/model/actions';

type Props = {
	ticket: ticket.TicketDto;
	services: service.ServiceDto[];
};

const ServiceCard = ({ service, ticketId }: { service: service.ServiceDto; ticketId: number }) => {
	return (
		<div
			className='cursor-pointer'
			onClick={() => {
				addServiceToTicket(ticketId, service.id);
			}}
		>
			<Image
				src={service.image}
				alt={service.name}
				width={100}
				height={100}
			/>
			<Text>{service.name}</Text>
			<Text>{service.price} ₽</Text>
		</div>
	);
};

export const CartItem = (props: Props) => {
	const { ticket, services } = props;
	return (
		<div className='flex gap-2 border border-gray-300 rounded-2xl p-6'>
			<X
				className='cursor-pointer'
				onClick={() => deleteTicket(ticket.id)}
			/>
			<div className='flex gap-2 items-start'>
				<div>Билет №{ticket.order_id}</div>
				<div>
					<Image
						src={ticket.slide.image}
						alt={ticket.slide.name}
						width={200}
						height={200}
					/>
				</div>
				Итоговая цена: {ticket.price}
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<div className='bg-secondary w-10 h-10 shadow flex items-center justify-center rounded-md ml-auto cursor-pointer'>
						<Plus />
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Дополнительные сервисы</DialogTitle>
						<DialogDescription>
							Выберите дополнительный сервис. Нажав на сервис вы автоматически добавите его в ваш заказ
						</DialogDescription>
					</DialogHeader>
					<div className='grid grid-cols-3 gap-2'>
						{services.map(service => (
							<ServiceCard
								key={service.id}
								service={service}
								ticketId={ticket.id}
							/>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
