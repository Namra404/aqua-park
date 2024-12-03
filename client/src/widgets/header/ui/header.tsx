import style from './style.module.css'

import logo from '../../../../public/aqua-logo.png'
import Image from "next/image";
import {Text} from "~/shared/ui/text";
import {Button} from "~/shared/ui/button";


export const Header = () => {
  return (
    <header className={style.header_main}>
        <Image src={logo} alt='not found' width={32} height={32}/>
        <Text asLink>Популярные горки</Text>
        <Text asLink>Дополнительные сервисы</Text>
        <Text asLink>Отзывы</Text>
        <div className={'gap-6'}>
            <Button className={'bg-white text-black'} >
                Log in
            </Button>
            <Button>
                Sign up
            </Button>
        </div>
    </header>
  )
}
