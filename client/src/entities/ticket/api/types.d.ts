module ticket {
  type Status = 'забронирован' | 'не забронирован'; 
  type Type = 'до 12' | 'после 12'; 

  type TicketDto = {
    id: number;
    user_id: number;
    type: Type,
    price: string;
    date: string;
    create_at: string;
    update_at: string;
    status: Status;
    slide_id: number;
    order_id: number;
    slide: slide.SlideDto;
    services: service.ServiceDto[]
  }

  type TicketParams = Pick<TicketDto, 'slide_id' | 'type' | 'price' | 'date' | 'status'>

  type TicketServiceParams = {
    ticket_id: number;
    service_id: number;
  }
}
