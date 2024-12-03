import {TopSlidersProps} from "~/entities/popular-rollers/model/types";
import {FC} from "react";
import {Text} from "~/shared/ui/text";

import style from './style.module.scss'
import {SlideCard} from "~/entities/popular-rollers/ui/popular-slide-card";

export const TopSliders:FC <TopSlidersProps> = (props) => {



    return (
        <div className={'flex flex-col mb-28'}>
            <div className={style.title}>
                <Text type={'tittle'}>Popular Destinations</Text>
                <Text className={'max-w-[372px] text-xs text-center'} type={'small'} opacity>Facilisi vulputate
                    malesuada libero aliquet metus facilisis varius sem.</Text>
                <Text className={'text-[4px]'} type={'small-bold'}>Все горки</Text>
            </div>
            <div className={'grid grid-cols-3 gap-4'}>
                {props.sliders.slice(0, 6).map((item, index) => (
                            <SlideCard
                                key={index}
                                img={item.img}
                                name={item.name}
                                description={item.description}
                                category_name={item.category_name}
                            />
                ))}
            </div>
        </div>
    )

}