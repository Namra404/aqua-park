import { Page } from '~/shared/ui/page';
import { MainPreview } from '~/widgets/(main)/main-preview/ui';
import { TopSliders } from '~/widgets/(main)/top-rollers/ui';
import { TopServices } from '~/widgets/(main)/top-services/ui';
import {ServicesEnum, slidersEnum} from "~/shared/mock/constants/constants";

export default function Home() {

	return (
		<Page>
			<MainPreview />
			<TopSliders sliders={slidersEnum} />
			<TopServices services={ServicesEnum} />
		</Page>
	);
}
