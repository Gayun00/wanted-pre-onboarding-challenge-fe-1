import React, { useEffect, useRef } from 'react';
import {
	useMutation,
	UseMutationResult,
	useQuery,
} from '@tanstack/react-query';
import { createTodo, fetchTodo } from 'api/todo';
import { CreateTodoParams, Todo, TodoRes } from 'interfaces/todos';
import './index.css';

function TodoList() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { data } = useQuery<TodoRes, Error>(['todo'], fetchTodo);

	const mutation: UseMutationResult<CreateTodoParams, Error, CreateTodoParams> =
		useMutation<CreateTodoParams, Error, CreateTodoParams>(
			async ({ title, content }) => createTodo(title, content)
		);

	const addTodo = (title: string, content: string) => {
		mutation.mutate({ title, content });
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
				<button
					onClick={() => {
						addTodo(inputRef?.current?.value as string, '새 할일 설명');
					}}>
					Add
				</button>
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
