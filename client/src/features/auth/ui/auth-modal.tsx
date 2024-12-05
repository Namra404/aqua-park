import { PropsWithChildren, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/shared/ui/dialog';

type Props = {
	title: string;
	trigger?: ReactNode;
} & PropsWithChildren;

export const AuthModal = (props: Props) => {
	const { children, title, trigger } = props;
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
