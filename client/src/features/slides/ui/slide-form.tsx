import images from '../../../../public/Card.png';

import style from './style.module.scss';
import { Text } from '~/shared/ui/text';
import { Button } from '~/shared/ui/button';
import Image from 'next/image';

export const SlideForm = (props: slide.SlideDto) => {
	const { image, name, description, category } = props;

	return (
		<div className={style.slide_form}>
			<div className={style.form_title}>
				<Image
					className={'relative w-[800px] max-h-[350] h-full object-cover rounded-xl'}
					src={image || images}
					alt='Изображение'
				/>
				<Text
					className={'absolute top-2/4 left-3'}
					type={'subtitle'}
					white
				>
					{name}
				</Text>
			</div>
			<div className={'p-4 overflow-hidden'}>
				<Text type={'small'}>{description}</Text>
			</div>
			<Text
				className={'p-4'}
				type={'small-bold'}
			>
				Возрастная кагетория: {category}
			</Text>
			<Button className={'max-w-[150px] w-full absolute right-4 bottom-4'}>Забронировать</Button>
		</div>
	);
};
