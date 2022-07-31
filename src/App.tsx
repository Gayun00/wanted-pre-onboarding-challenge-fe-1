import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Todo />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
