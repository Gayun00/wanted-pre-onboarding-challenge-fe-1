import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Todo from './pages/Todo';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Todo />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
