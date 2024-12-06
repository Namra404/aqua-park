'use client';
import Image from 'next/image';
import defaultImage from '../../../../public/Card.png';
import { Text } from '~/shared/ui/text';
import { Button } from '~/shared/ui/button';

export const Service = ({
	service,
	addServiceToTicket,
	selectedServices
}: {
	service: service.ServiceDto;
	addServiceToTicket: service.AddServiceToTicketHandler;
	selectedServices: service.ServiceDto[];
}) => {
	const { id, name, image, price } = service;

	const handleAddServiceToTicket = () => {
		addServiceToTicket(service);
	};
	return (
		<div>
			<Image
				src={image || defaultImage}
				alt={name}
			/>
			<Text>{name}</Text>
			<div>{price}</div>
			<Button
				onClick={handleAddServiceToTicket}
				disabled={selectedServices.includes(service)}
			>
				Добавить
			</Button>
		</div>
	);
};
