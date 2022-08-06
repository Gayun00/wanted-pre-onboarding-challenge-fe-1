import { Todo } from 'interfaces/todos';
import React, { useState } from 'react';
import TodoDetail from '../../components/TodoDetail';
import TodoList from '../../components/TodoList';
import './index.css';

function TodoContainer() {
	const [selectedTodo, setSelectedTodo] = useState<Todo>({
		title: '',
		content: '',
		id: '',
		createdAt: '',
		updatedAt: '',
	});
	return (
		<div className='todo-wrapper'>
			<TodoList setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />
			<TodoDetail selectedTodo={selectedTodo} />
		</div>
	);
}

export default TodoContainer;
