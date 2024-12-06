import Link from 'next/link';
import { ROUTER } from '~/shared/config/router';
import { Text } from '~/shared/ui/text';

export const Footer = () => {
	return (
		<footer className='max-w-page w-full mx-auto pt-16 pb-5 grid grid-cols-4 gap-x-32 gap-y-14'>
			<div className='bg-black h-[139px] col-span-4 flex items-center justify-center'>
				<Text
					type='subtitle'
					white
				>
					Здесь могла быть ваша реклама!
				</Text>
			</div>
			<div className='flex flex-col gap-2'>
				<Text type='subtitle'>Aqua park</Text>
				<Text
					className='pt-5'
					type='small'
					opacity
				>
					Lorem ipsum dolor sit amet consectetur. Enim nulla suscipit leo integer bibendum ultrices. Nulla sed arcu amet
					montes tellus sit sem quis.{' '}
				</Text>
			</div>
			<div>
				<Text type='subtitle'>Горки</Text>
				<div className='flex flex-col gap-0.5 pt-5'>
					<Text>«Ковер-самолет»</Text>
					<Text>«Рафтинг»</Text>
					<Text>«Спирали»</Text>
					<Text>«Каскады»</Text>
					<Text>«Мертвая петля»</Text>
					<Text>«Крыло»</Text>
				</div>
			</div>
			<div>
				<Text type='subtitle'>Ссылки</Text>
				<div className='flex flex-col gap-0.5 pt-5'>
					<Link href={ROUTER.pages.HOME}>
						<Text>Домой</Text>
					</Link>
					<Link href={ROUTER.pages.SLIDES}>
						<Text>Горки</Text>
					</Link>
					<Link href={ROUTER.pages.CART}>
						<Text>Корзина</Text>
					</Link>
				</div>
			</div>
			<div>
				<Text type='subtitle'>Контакты</Text>
				<div className='flex flex-col gap-0.5 pt-5'>
					<Text>(896) 675-9493 Рабочий</Text>
					<Text>__phpboy__God2007@gmail.com</Text>
					<Text>Саратов Политехническая 77 к.5 этаж 3 аудитория 231</Text>
				</div>
			</div>
			<div className='col-span-4 flex justify-center items-center'>
				<Text
					type='small-bold'
					opacity
				>
					©Copyright Аквапарк Ахпер {new Date().getFullYear()}. Design by Станиslave Сергеев при руководстве Игоря)
				</Text>
			</div>
		</footer>
	);
};
