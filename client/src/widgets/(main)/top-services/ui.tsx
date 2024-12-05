import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "~/shared/ui/carousel";
import {ServiceType} from "~/entities/popular-services/model/types";
import {SlideCard} from "~/entities/popular-rollers/ui/popular-slide-card";
import {Text} from "~/shared/ui/text";

type Props = {
    services: ServiceType[];
}

export const TopServices = (props: Props) => {
    const {services} = props;

    return (
        <>
            <Text className={'flex justify-center mb-5'} type={'tittle'}>Top Destinations</Text>
            <Carousel>
                <CarouselContent className={'pointer-events-none'}>
                    {
                        services.map((service: ServiceType, index) => (
                            <CarouselItem className="basis-1/3" key={index}>
                                <SlideCard name={service.name} price={service.price}/>
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}