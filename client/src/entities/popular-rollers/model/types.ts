

export type SlideProps = {
    img?: string;
    name: string;
    description?: string;
    category_name?: string;
    price?: number;
}

export type TopSlidersProps = {
    sliders: SlideProps[]
}