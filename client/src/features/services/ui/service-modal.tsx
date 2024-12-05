import {PropsWithChildren, ReactNode} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "~/shared/ui/dialog";
import {Text} from "~/shared/ui/text";


type Props = {
    trigger?: ReactNode;
} & PropsWithChildren

export const ServiceModal = ( props: Props) => {

    const { children , trigger } = props;

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><Text type={'subtitle'}>Доп услуги</Text></DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}