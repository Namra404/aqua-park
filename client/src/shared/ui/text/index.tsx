import {AllHTMLAttributes, FC} from "react";

import style from './style.module.scss'
import {cn} from "~/shared/lib/shadcn";

interface TextProps extends AllHTMLAttributes<HTMLParagraphElement>{
    type?:  'small' | 'small-bold' | 'medium' | 'medium-bold' | 'tittle' | 'subtitle',
    asLink?: boolean,
    opacity?: boolean,
    white?: boolean;
}


export const Text: FC<TextProps> = (props) => {
    const { children, className, type = 'small', asLink, opacity, white, ...attributes} = props

    return (
        <p
            className={cn(style.text, className,{
                [style.text_small]: type === 'small',
                [style.text_small_bold]: type === 'small-bold',
                [style.text_medium_bold]: type === 'medium-bold',
                [style.text_tittle]: type === 'tittle',
                [style.text_subtitle]: type === 'subtitle',
                [style.text_medium]: type === 'medium',
                [style.asLink]: asLink,
                [style.opacity]: opacity,
                [style.white]: white,
            })}
            {...attributes}
        >
            {children}
        </p>

    )

}