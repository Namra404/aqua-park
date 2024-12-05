'use client'
import {ServiceType} from "~/entities/popular-services/model/types";
import logo from '../../../../public/service-logo.png'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "~/shared/ui/carousel";
import {SlideCard} from "~/entities/popular-rollers/ui/popular-slide-card";

interface ServiceFormProps {
    services: ServiceType[]
}

export const ServiceForm = (props: ServiceFormProps) => {

    const {services} = props

    return (
        <Carousel>
            <CarouselContent className={'pointer-events-none'}>
                {
                    services.map((service: ServiceType, index) => (
                        <CarouselItem className="basis-1/2" key={index}>
                            <SlideCard name={service.name} price={service.price}/>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>

    )
}