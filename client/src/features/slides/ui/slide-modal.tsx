import { PropsWithChildren, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '~/shared/ui/dialog';

import style from './style.module.scss';
import { DialogTitle } from '@radix-ui/react-dialog';

type Props = {
	trigger?: ReactNode;
} & PropsWithChildren;

export const SlideModal = (props: Props) => {
	const { children, trigger } = props;

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className={style.slide_modal}>
				<DialogHeader className='hidden'>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
