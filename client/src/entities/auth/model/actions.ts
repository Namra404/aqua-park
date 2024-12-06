'use server';

import { revalidatePath } from 'next/cache';
import { ROUTER } from '~/shared/config/router';

export const updatePages = async () => {
	revalidatePath(ROUTER.pages.HOME);
	revalidatePath(ROUTER.pages.CART);
};
