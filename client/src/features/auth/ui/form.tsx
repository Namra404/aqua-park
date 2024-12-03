import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

type Props = {
	mode?: 'register' | 'login';
};

export const AuthForm = (props: Props) => {
	const { mode = 'login' } = props;

	return mode === 'login' ? <LoginForm /> : <RegisterForm />;
};
