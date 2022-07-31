import React from 'react';
import TodoDetail from '../../components/TodoDetail';
import TodoList from '../../components/TodoList';
import './index.css';

function Todo() {
	return (
		<div className='todo-wrapper'>
			<TodoList />
			<TodoDetail />
		</div>
	);
}

export default Todo;
