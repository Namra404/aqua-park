import { z } from 'zod';

export const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const RegisterFormSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string()
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
