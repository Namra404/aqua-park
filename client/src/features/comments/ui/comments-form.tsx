import { getReviews } from '~/entities/slide/api/actions';
import { Text } from '~/shared/ui/text';
import { CommentView } from '~/widgets/(comments)/comment-view/ui';

export const CommentMok = [
	{
		user_name: 'Арман',
		comment:
			'Водные горки считаются наиболее популярными аттракционами в любом аквапарке. Принцип их работы не затейлив. Он заключается в спуске человека в бассейн или естественный водоем по гладкой, наклонной поверхности. Подача в верхнюю часть сооружения воды обеспечивает более быстрое и легкое скольжение, что усиливает развлекательный эффект.',
		rating: 5
	},
	{
		user_name: 'Станислав',
		comment:
			'Водные горки считаются наиболее популярными аттракционами в любом аквапарке. Принцип их работы не затейлив. Он заключается в спуске человека в бассейн или естественный водоем по гладкой, наклонной поверхности. Подача в верхнюю часть сооружения воды обеспечивает более быстрое и легкое скольжение, что усиливает развлекательный эффект.',
		rating: 3
	},
	{
		user_name: 'Игорь',
		comment:
			'Водные горки считаются наиболее популярными аттракционами в любом аквапарке. Принцип их работы не затейлив. Он заключается в спуске человека в бассейн или естественный водоем по гладкой, наклонной поверхности. Подача в верхнюю часть сооружения воды обеспечивает более быстрое и легкое скольжение, что усиливает развлекательный эффект.',
		rating: 2
	}
];

export type CommentProps = {
	user_name: string;
	comment: string;
	rating: number;
};

type Props = {
	slideId: number;
};

export const CommentsForm = async (props: Props) => {
	const comments = await getReviews(props.slideId);

	console.log('comments', comments);

	return (
		<div className={'ml-5 rounded-xl w-full p-2  bg-gray-200 '}>
			<Text
				type={'medium-bold'}
				className={'border-b-2 border-black mb-5'}
			>
				Отзывы
			</Text>
			<div className={'flex flex-col'}>
				{comments.map((item, index) => (
					<CommentView
						key={index}
						user_name={item.user.name}
						comment={item.comment}
						rating={item.rating}
					/>
				))}
			</div>
		</div>
	);
};
