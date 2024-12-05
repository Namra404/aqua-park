import {PropsWithChildren, ReactNode} from "react";
import {Dialog, DialogContent, DialogTrigger} from "~/shared/ui/dialog";

import style from './style.module.scss'

type Props = {
    trigger?: ReactNode;
} & PropsWithChildren

export const SlideModal = ( props: Props) => {

    const { children , trigger } = props;

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={style.slide_modal} >
                {children}
            </DialogContent>
        </Dialog>
    )
}