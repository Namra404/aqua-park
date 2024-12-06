'use client';

import style from './style.module.css';

import cart from '../../../../public/cart.png';
import avatar from '../../../../public/avatar.png';
import logo from '../../../../public/aqua-logo.png';
import Image from 'next/image';
import { Text } from '~/shared/ui/text';
import { Button } from '~/shared/ui/button';
import { AuthForm, AuthModal } from '~/features/auth';
import { useRouter } from 'next/navigation';
import { ROUTER } from '~/shared/config/router';
import { AuthStorage } from '~/entities/auth';
import { useStore } from '@nanostores/react';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '~/shared/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export const Header = () => {
	const router = useRouter();
	const authStatus = useStore(AuthStorage.instance.status);

	return (
		<header className={style.header_main}>
			<Image
				className={'cursor-pointer'}
				src={logo}
				alt='not found'
				width={32}
				height={32}
				onClick={() => router.push(ROUTER.pages.HOME)}
			/>
			<Text asLink>Популярные горки</Text>
			<Text asLink>Дополнительные сервисы</Text>
			{authStatus ? (
				<div className={'flex items-center'}>
					<Link href={ROUTER.pages.CART}>
						<Image
							className={'mr-5 cursor-pointer'}
							src={cart}
							alt={'not found'}
							width={32}
						/>
					</Link>

					<DropdownMenu>
						<DropdownMenuTrigger>
							<Image
								className={'cursor-pointer'}
								src={avatar}
								alt={'not found'}
								width={32}
								onClick={() => router.push(ROUTER.pages.PROFILE)}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Учетная запись</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='mb-1'>Профиль</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									variant={'destructive'}
									onClick={AuthStorage.instance.logout.bind(AuthStorage.instance)}
								>
									<LogOut /> Выйти
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<div className={'flex gap-2'}>
					<AuthModal
						title='Войти'
						trigger={<Button className={'bg-white text-black'}>Log in</Button>}
					>
						<AuthForm mode='login' />
					</AuthModal>

					<AuthModal
						title='Регистрация'
						trigger={<Button>Sign in</Button>}
					>
						<AuthForm mode='register' />
					</AuthModal>
				</div>
			)}
		</header>
	);
};
