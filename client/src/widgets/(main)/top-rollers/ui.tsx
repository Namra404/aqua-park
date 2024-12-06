'use client';

import { TopSlidersProps } from '~/entities/popular-rollers/model/types';
import { FC } from 'react';
import { Text } from '~/shared/ui/text';

import style from './style.module.scss';
import { SlideCard } from '~/entities/popular-rollers/ui/popular-slide-card';
import { ROUTER } from '~/shared/config/router';
import { useRouter } from 'next/navigation';

export const TopSliders: FC<TopSlidersProps> = props => {
	const router = useRouter();

	return (
		<div className={'flex flex-col mb-28'}>
			<div className={style.title}>
				<Text type={'tittle'}>Popular Destinations</Text>
				<Text
					className={'max-w-[372px] text-xs text-center'}
					type={'small'}
					opacity
				>
					Facilisi vulputate malesuada libero aliquet metus facilisis varius sem.
				</Text>
				<Text
					className={'text-[4px]'}
					type={'small-bold'}
					asLink
					onClick={() => router.push(ROUTER.pages.SLIDES)}
				>
					Все горки
				</Text>
			</div>
			<div className={'grid grid-cols-3 gap-4'}>
				{props.sliders.slice(0, 6).map((item, index) => (
					<SlideCard
						key={index}
						{...item}
					/>
				))}
			</div>
		</div>
	);
};
