module slide {
  type SlideDto = {
    id?: number;
    name: string;
    description: string;
    category: string
    image: string;
    create_at: string;
    update_at: string;
  }

  type Review = {
    id: number;
    comment: string;
    rating: number;
    create_at: string;
    user: auth.User;
    slide: SlideDto;
  }
}
