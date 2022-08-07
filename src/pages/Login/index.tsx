import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login } from 'api/todo';
import { LoginParams, LoginRes } from 'interfaces/todos';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
	message: string;
	token: string;
}

function Login() {
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const validateLogin = () => {
		const isEmailValid = email.includes('@') || email.includes('.');
		const isPasswordValid = password.length > 8;
		return isEmailValid && isPasswordValid;
	};

	const loginMutation: UseMutationResult<LoginRes, Error, LoginParams> =
		useMutation<LoginRes, Error, LoginParams>(
			['login'],
			async ({ email, password }) => login(email, password),
			{
				onSuccess: (data: LoginRes, _variables: LoginParams) => {
					localStorage.setItem('token', data.token);
					console.log(data);
				},
				onError: (error) => {
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
				className={`login_button ${validateLogin() && 'isValid'}`}
				onClick={onClickLogin}>
				Submit
			</button>
		</div>
	);
}

export default Login;
