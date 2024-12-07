import { Page } from '~/shared/ui/page';
import { slidersEnum } from '~/shared/mock/constants/constants';
import { SlideCard } from '~/entities/popular-rollers/ui/popular-slide-card';
import { SlideService } from '~/entities/slide/api';
import { cookies } from 'next/headers';

const handleGetSlides = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	const slidersService = new SlideService();
	try {
		const response = await slidersService.getSlides(
			token
				? {
						headers: {
							Authorization: `Bearer ${token.value}`,
							Accept: 'application/json'
						}
					}
				: undefined
		);

		return response.data ?? [];
	} catch (error) {
		return [];
	}
};

export default async function Slides() {
	const slides = await handleGetSlides();
	return (
		<Page>
			<div className={'grid grid-cols-3 gap-4'}>
				{slides.map((item, index) => (
					<SlideCard
						key={index}
						{...item}
					/>
				))}
			</div>
		</Page>
	);
}
