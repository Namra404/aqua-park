import {CommentProps} from "~/features/comments/ui/comments-form";
import {Text} from "~/shared/ui/text";
import star from '../../../../public/star.png'

import style from './style.module.scss'
import logo from "../../../../public/avatar.png";
import Image from "next/image";


export const CommentView = (props: CommentProps) => {

    const {user_name, comment, rating} = props

    return (
        <>
            <div className={'flex flex-col shadow-2xl p-2 rounded-xl mb-2'}>
                <Text type={'medium'}>{user_name}</Text>
                <div
                    className={'overflow-hidden'}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxHeight: '4.5em',
                    }}
                >
                    <Text>{comment}</Text>
                </div>
            </div>
            <div className={'flex mb-5'}>
                {Array.from({length: rating}, (_, index) => (
                    <Image
                        key={index}
                        src={star}
                        alt={'not found'}
                        width={20}
                        height={20}
                    />
                ))}
            </div>
        </>
    )
}