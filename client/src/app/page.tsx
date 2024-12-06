import { Page } from '~/shared/ui/page';
import { MainPreview } from '~/widgets/(main)/main-preview/ui';
import { TopSliders } from '~/widgets/(main)/top-rollers/ui';
import { TopServices } from '~/widgets/(main)/top-services/ui';
import { ServicesEnum, slidersEnum } from '~/shared/mock/constants/constants';

const handleGetSlides = async () => {
	return Promise.resolve({
		data: slidersEnum,
		status: 200
	});
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
			<TopSliders sliders={sliders.data} />
			<TopServices services={services.data} />
		</Page>
	);
}
