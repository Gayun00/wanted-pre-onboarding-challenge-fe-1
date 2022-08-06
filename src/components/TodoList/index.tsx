import React, { useRef } from 'react';
import {
	QueryClient,
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { createTodo, fetchTodo } from 'api/todo';
import { CreateTodoParams, Todo, TodoRes } from 'interfaces/todos';
import './index.css';
import { SERVER_URL } from 'utils/constants';
import axios from 'axios';

function TodoList() {
	const queryClient = new QueryClient();
	const inputRef = useRef<HTMLInputElement>(null);
	const { data } = useQuery<TodoRes, Error>(['todo'], fetchTodo);
	const token = localStorage.getItem('token')! as string;

	const mutation = useMutation((title: string) => {
		return axios.post(
			`${SERVER_URL}/todos`,
			{ title: title },
			{
				headers: {
					'Content-type': 'application/json',
					Authorization: token,
				},
			}
		);
	});
	const addTodo = () => {
		mutation.mutate('새로운 할 일');
	};
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
				<button onClick={addTodo}>Add</button>
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
