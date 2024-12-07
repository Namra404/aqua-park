import { Link } from 'lucide-react';
import { ROUTER } from '~/shared/config/router';
import { Page } from '~/shared/ui/page';

export default function UnluckPage() {
	return (
		<Page>
			<div>Оплата не прошла, попробуйте еще раз</div>
			<Link href={ROUTER.pages.CART}>Корзина</Link>
		</Page>
	);
}
