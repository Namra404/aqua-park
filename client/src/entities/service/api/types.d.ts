module service {
	type ServiceDto = {
		id: number;
		name: string;
		price: number;
		image: string;
	};

	type AddServiceToTicketHandler = (service: ServiceDto) => void;
}
