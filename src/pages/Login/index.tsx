import React, { useState } from 'react';

interface LoginResponse {
	message: string;
	token: string;
}

function Login() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const validateLogin = () => {
		const isEmailValid = email.includes('@') || email.includes('.');
		const isPasswordValid = password.length > 8;
		return isEmailValid && isPasswordValid;
	};

	const handleLogin = () => {
		fetch('http://localhost:8080/users/login', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		}).then((res) => {
			res.json();
		});
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
				onClick={handleLogin}>
				Submit
			</button>
		</div>
	);
}

export default Login;
