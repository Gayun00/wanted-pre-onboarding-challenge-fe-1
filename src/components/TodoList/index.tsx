import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodo } from 'api/todo';
import { Todo, TodoRes } from 'interfaces/todos';
import './index.css';
import { SERVER_URL } from 'utils/constants';

function TodoList() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { data } = useQuery<TodoRes, Error>(['todo'], fetchTodo);

	function handleCreateTodo(
		title: string | number | undefined,
		content: string | number | undefined
	): Promise<TodoRes> {
		const token = localStorage.getItem('token')! as string;

		return fetch(`${SERVER_URL}/todos`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify({
				title: title,
				content: content,
			}),
		}).then((response) => response.json());
	}

	return (
		<div className='todo_list'>
			<div className='input_container'>
				<input
					type='text'
					name='todo-input'
					id='todo-input'
					placeholder='add your todo'
					ref={inputRef}
				/>
				<button onClick={() => handleCreateTodo('df', 'sdf')}>Add</button>
			</div>
			<ul>
				{data?.data?.map((todo: Todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
