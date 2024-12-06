'use client';
import { SlideOrderProps } from '~/entities/profile-order/model/types';
import { SlideCard } from '~/entities/popular-rollers/ui/popular-slide-card';
import { Text } from '~/shared/ui/text';
import { ServiceForm, ServiceModal } from '~/features/services';

export const ProfileOrder = (props: SlideOrderProps) => {
	const { total_price, slide, services } = props;

	return (
		<div className={'max-w-[250px] relative mb-4'}>
			<SlideCard {...slide} />
			<Text
				className={'absolute top-2 left-2 bg-black py-0.5 px-2 rounded-xl'}
				white
			>
				{total_price}
			</Text>
			<ServiceModal
				trigger={
					<Text
						className={'bg-[#ad78f8] rounded-bl-full absolute top-0 right-0 p-2'}
						white
						type={'small-bold'}
						asLink
					>
						+{services?.length}
					</Text>
				}
			>
				<ServiceForm services={services} />
			</ServiceModal>
		</div>
	);
};
