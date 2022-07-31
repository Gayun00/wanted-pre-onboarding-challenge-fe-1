import React, { useState } from 'react';

function Login() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	return (
		<div className='login-wrapper'>
			<input type='email' name='email' id='' />
			<input type='password' name='password' id='' />
			<button>Submit</button>
		</div>
	);
}

export default Login;
