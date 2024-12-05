'use client'

import style from './style.module.css';

import cart from '../../../../public/cart.png'
import avatar from '../../../../public/avatar.png'
import logo from '../../../../public/aqua-logo.png';
import Image from 'next/image';
import { Text } from '~/shared/ui/text';
import { Button } from '~/shared/ui/button';
import { AuthForm, AuthModal } from '~/features/auth';
import {useRouter} from "next/navigation";
import {ROUTER} from "~/shared/config/router";
import {AuthStorage} from "~/entities/auth";


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
            {
                AuthStorage.instance.status.value ? (
					<div className={'flex items-center'}>
						<img className={'mr-5 cursor-pointer'} src={Object.values(cart)[0]} alt={'not found'} width={32}
							 onClick={() => router.push(ROUTER.pages.CART)}/>
						<img className={'cursor-pointer'} src={Object.values(avatar)[0]} alt={'not found'} width={32}
							 onClick={() => router.push(ROUTER.pages.PROFILE)}/>
					</div>
				) : (
					<div className={'flex gap-2'}>
						<AuthModal
							title='Войти'
                            trigger={<Button className={'bg-white text-black'}>Log in</Button>}
                        >
                            <AuthForm mode='login'/>
                        </AuthModal>

                        <AuthModal
                            title='Регистрация'
                            trigger={<Button>Sign in</Button>}
                        >
                            <AuthForm mode='register'/>
                        </AuthModal>
                    </div>
                )
            }

        </header>
    );
};
