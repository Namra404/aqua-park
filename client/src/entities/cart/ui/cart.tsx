import { X } from 'lucide-react';

type Props = {
	ticket: ticket.TicketDto;
};

export const CartItem = (props: Props) => {
	const { ticket } = props;
	return (
		<div className='flex gap-2 border border-gray-300 rounded-2xl p-6'>
			<X />
			<div>ticket id: {ticket.id}</div>
		</div>
	);
};
