import style from './style.module.scss'
import {Text} from "~/shared/ui/text";


export const MainPreview = () => {
    return (
        <div className={style.main}>
            <div className={'max-w-[468px] ml-[100px]'}>
                <Text className={style.title_text} type={'tittle'} white>Live your dream destinations.</Text>
                <Text white type={'small'} opacity>Odio eu consectetur ornare congue non enim pellentesque eleifend ipsum.</Text>
            </div>
        </div>
    );
}