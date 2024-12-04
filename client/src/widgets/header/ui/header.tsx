'use client'

import style from './style.module.css';

import logo from '../../../../public/aqua-logo.png';
import Image from 'next/image';
import { Text } from '~/shared/ui/text';
import { Button } from '~/shared/ui/button';
import { AuthForm, AuthModal } from '~/features/auth';
import {useRouter} from "next/navigation";
import {ROUTER} from "~/shared/config/router";

export const Header = () => {

	const router = useRouter();

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
			<Text asLink>Отзывы</Text>
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
		</header>
	);
};
