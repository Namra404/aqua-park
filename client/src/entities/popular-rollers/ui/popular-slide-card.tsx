import style from './style.module.scss';
import { Text } from '~/shared/ui/text';
import Image from 'next/image';
import { SlideForm, SlideModal } from '~/features/slides';
import {CommentsForm} from "~/features/comments";
import {CommentMok} from "~/features/comments/ui/comments-form";

type Props = { price?: number } & slide.SlideDto;

export const SlideCard = (props: Props) => {
	const { name, description, price, image } = props;

	return (
		<>
			<SlideModal
				trigger={
					<div className={style.main_card}>
						<Image
							src={image}
							width={100}
							height={100}
							alt={name}
							className='absolute inset object-cover w-full h-full -z-10 rounded-2xl shadow'
						/>
						{price && (
							<div className={'absolute top-2 right-2 bg-black text-white rounded-xl text-sm py-1 px-3 font-bold'}>
								{price}
							</div>
						)}
						<Text
							className={'mb-6 relative z-10'}
							type={'medium-bold'}
							white
						>
							{name}
						</Text>
					</div>
				}
			>
				<div className={'flex p-2'}>
					<SlideForm
						{...props}
						description={description}
					/>
					<CommentsForm comments={CommentMok}/>
				</div>
			</SlideModal>
		</>
	);
};
