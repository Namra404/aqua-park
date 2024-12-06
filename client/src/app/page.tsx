import { Page } from '~/shared/ui/page';
import { MainPreview } from '~/widgets/(main)/main-preview/ui';
import { TopSliders } from '~/widgets/(main)/top-rollers/ui';
import { TopServices } from '~/widgets/(main)/top-services/ui';
import { ServicesEnum } from '~/shared/mock/constants/constants';
import { SlideService } from '~/entities/slide/api';
import { cookies } from 'next/headers';
import { COOKIE_USER_KEY } from '~/entities/auth/model/model';

const handleGetSlides = async () => {
	'use server';
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get(COOKIE_USER_KEY);
	if (!token) {
		return [];
	}

	const slidersService = new SlideService();
	const response = await slidersService.getSlides({
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return response.data ?? [];
};
const handleGetServices = async () => {
	return Promise.resolve({
		data: ServicesEnum,
		status: 200
	});
};

export default async function Home() {
	const [sliders, services] = await Promise.all([handleGetSlides(), handleGetServices()]);
	return (
		<Page>
			<MainPreview />
			<TopSliders sliders={sliders} />
			<TopServices services={services.data} />
		</Page>
	);
}
