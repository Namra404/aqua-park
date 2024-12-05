import {SlideProps} from "~/entities/popular-rollers/model/types";
import {ServiceType} from "~/entities/popular-services/model/types";


export type SlideOrderProps = {
    total_price: number;
    slide: SlideProps;
    services: ServiceType[];
}

export type ProfileAllSlideProps = {
    slidesAndService: SlideOrderProps[];
}
