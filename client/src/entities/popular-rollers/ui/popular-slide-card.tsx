import {FC} from "react";

import style from './style.module.scss'
import {Text} from "~/shared/ui/text";
import {SlideProps} from "~/entities/popular-rollers/model/types";
import {SlideForm, SlideModal} from "~/features/slides";


export const SlideCard: FC<SlideProps> = (props) => {
    const {img, name, description, category_name, price} = props


    return (
        <>
            <SlideModal
                trigger={
                    <div className={style.main_card}>
                        {price && (
                            <div
                                className={'absolute top-2 right-2 bg-black text-white rounded-xl text-sm py-1 px-3 font-bold'}>
                                {price}
                            </div>
                        )}
                        <Text className={'mb-6'} type={'medium-bold'} white>{name}</Text>
                    </div>}
            >
                <SlideForm {...props} description={description}/>
            </SlideModal>
        </>
    )
}