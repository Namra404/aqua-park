'use client';
import { X } from 'lucide-react';
import { deleteTicket } from '~/entities/ticket/model/model';

type Props = {
	ticket: ticket.TicketDto;
};

export const CartItem = (props: Props) => {
	const { ticket } = props;
	return (
		<div className='flex gap-2 border border-gray-300 rounded-2xl p-6'>
			<X
				className='cursor-pointer'
				onClick={() => deleteTicket(ticket.id)}
			/>
			<div>Билет №{ticket.order_id}</div>
			Итоговая цена: {ticket.price}
		</div>
	);
};
