import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query';
import { signup } from 'api/todo';
import { SignUpParams } from 'interfaces/todos';
import React, { useState } from 'react';
import './index.css';

function SignUp() {
	const queryClient = useQueryClient();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const validateSignup = () => {
		const isEmailValid = email.includes('@') || email.includes('.');
		const isPasswordValid = password.length > 8;
		return isEmailValid && isPasswordValid;
	};

	const signUpMutation: UseMutationResult<SignUpParams, Error, SignUpParams> =
		useMutation<SignUpParams, Error, SignUpParams>(
			async ({ email, password }) => signup(email, password),
			{
				onSuccess: (data) => {
					// queryClient.invalidateQueries(['todo']);
					console.log(data);
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
