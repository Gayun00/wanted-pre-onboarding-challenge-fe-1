import React, { useState } from 'react';
import './index.css';

function SignUp() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const validateSignup = () => {
		const isEmailValid = email.includes('@') || email.includes('.');
		const isPasswordValid = password.length > 8;
		return isEmailValid && isPasswordValid;
	};

	const handleSignUp = () => {
		fetch('http://localhost:8080/users/create', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
	};

	return (
		<div className='signup-wrapper'>
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
				className={`signup_button ${validateSignup() && 'isValid'}`}
				onClick={handleSignUp}>
				Submit
			</button>
		</div>
	);
}

export default SignUp;
