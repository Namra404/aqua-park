import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/shared/ui/carousel';
import { SlideCard } from '~/entities/popular-rollers/ui/popular-slide-card';
import { Text } from '~/shared/ui/text';

type Props = {
	services: service.ServiceDto[];
};

export const TopServices = (props: Props) => {
	const { services } = props;

	return (
		<>
			<Text
				className={'flex justify-center mb-5'}
				type={'tittle'}
			>
				Top Destinations
			</Text>
			<Carousel>
				<CarouselContent className={'pointer-events-none'}>
					{services.map((service: service.ServiceDto, index) => (
						<CarouselItem
							className='basis-1/3'
							key={index}
						>
							<SlideCard
								name={service.name}
								price={service.price}
								image={service.image}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	);
};
