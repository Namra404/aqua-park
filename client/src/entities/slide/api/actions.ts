'use server';

import { cookies } from 'next/headers';
import { SlideService } from '.';

export const getReviews = async (slideId: number) => {
	const cookiesStorage = await cookies();

	const token = cookiesStorage.get('aqua-park-user');

	console.log(token?.value);

	if (!token) {
		return [];
	}
	const slideService = new SlideService();

	const { data: comments } = await slideService.getSlideReview(slideId, {
		headers: {
			Authorization: `Bearer ${token.value}`,
			Accept: 'application/json'
		}
	});
	return comments;
};
