import React, { useState } from 'react';
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query';
import { signup } from 'api/todo';
import { SignUpParams, UserRes } from 'interfaces/todos';
import './index.css';

function SignUp() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const validateSignup = () => {
		const isEmailValid = email.includes('@') || email.includes('.');
		const isPasswordValid = password.length > 8;
		return isEmailValid && isPasswordValid;
	};

	const signUpMutation: UseMutationResult<UserRes, Error, SignUpParams> =
		useMutation<UserRes, Error, SignUpParams>(
			async ({ email, password }) => signup(email, password),
			{
				onSuccess: () => {
					alert('회원가입이 완료되었습니다.');
				},
				onError: (error) => {
					console.log(error);
				},
			}
		);

	const onClickSignUp = () => {
		signUpMutation.mutate({ email, password });
	};

	return (
		<div className='signup-wrapper'>
			<input
				type='email'
				name='email'
				id='email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				name='password'
				id='password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				className={`signup_button ${validateSignup() && 'isValid'}`}
				onClick={onClickSignUp}>
				Submit
			</button>
		</div>
	);
}

export default SignUp;
