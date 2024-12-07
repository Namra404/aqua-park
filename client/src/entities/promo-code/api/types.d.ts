module promoCode {
	type CreateParams = {
		code: string;
		discount: number;
		expires_at: string;
	};
}
