import React, { useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login } from 'api/todo';
import { LoginParams, UserRes } from 'interfaces/todos';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const validateLogin = () => {
		const isEmailValid = email.includes('@') || email.includes('.');
		const isPasswordValid = password.length > 8;
		return isEmailValid && isPasswordValid;
	};

	const loginMutation: UseMutationResult<UserRes, Error, LoginParams> =
		useMutation<UserRes, Error, LoginParams>(
			['login'],
			async ({ email, password }) => login(email, password),
			{
				onSuccess: (data: UserRes, _variables: LoginParams) => {
					localStorage.setItem('token', data.token);
				},
				onError: () => {
					alert('로그인에 실패했습니다.');
					navigate('/');
				},
			}
		);

	const onClickLogin = () => {
		loginMutation.mutate({ email, password });
	};

	return (
		<div className='login-wrapper'>
			<input
				type='email'
				name='email'
				id=''
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				name='password'
				id=''
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				disabled={!validateLogin()}
				className={`login_button ${validateLogin() && 'isValid'}`}
				onClick={onClickLogin}>
				Submit
			</button>
		</div>
	);
}

export default Login;
