module order {
	type OrderDto = {
		promo_code: string;
		tickets: ticket.TicketDto[];
	};

	type CreateParams = {
		promo_code: string;
		tickets: ticket.TicketParams[];
	};

	type CartOrder = {
		id: number;
		total_price: string;
		discount: string;
		tickets: ticket.TicketDto[];
	};

	type Cart = {
		orders: CartOrder[];
	};

	type CreatedOrder = {
		order: CartOrder;
	};
}
