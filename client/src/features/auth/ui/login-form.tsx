'use client';
import { useForm } from 'react-hook-form';
import { LoginFormType } from '../model/schema';
import { AuthStorage } from '~/entities/auth';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';
import { Button } from '~/shared/ui/button';

export const LoginForm = () => {
	const form = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

	const handleSubmit = (values: LoginFormType) => {
		return AuthStorage.instance.login(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите email'
									{...field}
								/>
							</FormControl>
							<FormDescription>Введите ваш email, который вы указывали при регистрации</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите пароль'
									{...field}
								/>
							</FormControl>
							<FormDescription>Введите ваш пароль, который вы указывали при регистрации</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Войти</Button>
			</form>
		</Form>
	);
};
