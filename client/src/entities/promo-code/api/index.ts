import { api } from '~/shared/lib/request';

export class PromoCodeService {
	create(promoCode: promoCode.CreateParams) {
		return api.fetch.post<void>('/promo-code', promoCode);
	}
}
