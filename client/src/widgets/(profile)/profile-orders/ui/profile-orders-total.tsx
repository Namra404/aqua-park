import { SlideCard } from '~/entities/popular-rollers/ui/popular-slide-card';
import { ProfileOrder } from '~/entities/profile-order/ui/profile-order';

const HistoryOrderCard = (props: { order: order.CartOrder }) => {
	const { order } = props;
	return (
		<div className='max-w-[250px] relative mb-4'>
			<SlideCard {...order?.tickets[0]?.slide} />
		</div>
	);
};

export const ProfileOrdersTotal = (props: { orders: order.CartOrder[] }) => {
	const { orders } = props;

	return (
		<div className={'w-[900px] min-h-[400px] shadow-2xl rounded-xl p-4 grid grid-cols-3'}>
			{orders.map((item, index) => (
				<HistoryOrderCard
					key={item.id}
					order={item}
				/>
			))}
		</div>
	);
};
