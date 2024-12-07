import { Page } from '~/shared/ui/page';
import { MainPreview } from '~/widgets/(main)/main-preview/ui';
import { TopSliders } from '~/widgets/(main)/top-rollers/ui';
import { TopServices } from '~/widgets/(main)/top-services/ui';
import { ServicesEnum } from '~/shared/mock/constants/constants';
import { SlideService } from '~/entities/slide/api';
import { cookies } from 'next/headers';
import { AdditionalService } from '~/entities/service/api';

const handleGetSlides = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	if (!token) {
		return [];
	}

	const slidersService = new SlideService();
	try {
		const response = await slidersService.getSlides({
			headers: {
				Authorization: `Bearer ${token.value}`,
				Accept: 'application/json'
			}
		});

		return response.data ?? [];
	} catch (error) {
		return [];
	}
};
const handleGetServices = async () => {
	'use server';

	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	console.log(token?.value);

	if (!token) {
		return [];
	}

	const additionalService = new AdditionalService();
	try {
		const response = await additionalService.getServices({
			headers: {
				Authorization: `Bearer ${token.value}`,
				Accept: 'application/json'
			}
		});

		return response.data ?? [];
	} catch (error) {
		return [];
	}
};

export default async function Home() {
	const [sliders, services] = await Promise.all([handleGetSlides(), handleGetServices()]);

	return (
		<Page>
			<MainPreview />
			<TopSliders sliders={sliders} />
			<TopServices services={services} />
		</Page>
	);
}
