import { PropsWithChildren } from 'react';
import { cn } from '~/shared/lib/shadcn';

type Props = PropsWithChildren & {
  className?: string;
};

export const Page = (props: Props) => {
  const { className, children } = props;
  return (
    <main className={cn('max-w-page w-full mx-auto flex-page flex flex-col', className)}>{children}</main>
  );
};
