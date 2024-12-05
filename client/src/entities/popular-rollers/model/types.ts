import {AllHTMLAttributes} from "react";

export interface SlideProps extends AllHTMLAttributes<HTMLParagraphElement> {
    img?: string;
    name: string;
    description?: string;
    category_name?: string;
    price?: number;
}

export type TopSlidersProps = {
    sliders: SlideProps[]
}