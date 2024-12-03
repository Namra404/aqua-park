import { Page } from '~/shared/ui/page';
import {MainPreview} from "~/widgets/(main)/main-preview/ui";
import {TopSliders} from "~/widgets/(main)/top-rollers/ui";
import {TopServices} from "~/widgets/(main)/top-services/ui";

export default function Home() {

	const slidersEnum = [
		{
			img: '',
			name: '«Ковер-самолет»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: '«Рафтинг»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: '«Спирали»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: '«Каскады»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: '«Мертвая петля»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: '«Крыло»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: '«Супер-боул»',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: 'Egypt',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		},
		{
			img: '',
			name: 'Egypt',
			description: 'Lorem Ipsum',
			category_name: 'Взрослая 16+',
		}
	]

	const ServicesEnum = [
		{
			name: 'Воздушный шар',
			price: 2000
		},
		{
			name: 'Воздушный шар',
			price: 2000
		},
		{
			name: 'Воздушный шар',
			price: 2000
		},
		{
			name: 'Воздушный шар',
			price: 2000
		},
		{
			name: 'Воздушный шар',
			price: 2000
		}
	]


	return(
		<Page>
			<MainPreview/>
			<TopSliders sliders={slidersEnum}/>
			<TopServices services={ServicesEnum}/>
		</Page>
	)
}
