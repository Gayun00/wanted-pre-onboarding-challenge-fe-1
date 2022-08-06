import React, { useEffect, useRef } from 'react';
import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { createTodo, fetchTodo, deleteTodo } from 'api/todo';
import {
	CreateTodoParams,
	DeleteTodoParams,
	Todo,
	TodoRes,
} from 'interfaces/todos';
import './index.css';

function TodoList({ setSelectedTodo }: any) {
	const queryClient = useQueryClient();
	const inputRef = useRef<HTMLInputElement>(null);
	const { data } = useQuery<TodoRes, Error>(['todo'], fetchTodo);

	const addTodoMutation: UseMutationResult<
		CreateTodoParams,
		Error,
		CreateTodoParams
	> = useMutation<CreateTodoParams, Error, CreateTodoParams>(
		async ({ title, content }) => createTodo(title, content),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['todo']);
			},
		}
	);

	const addTodo = (title: string, content: string) => {
		addTodoMutation.mutate({ title, content });
	};

	const deleteTodoMutation: UseMutationResult<
		DeleteTodoParams,
		Error,
		DeleteTodoParams
	> = useMutation<DeleteTodoParams, Error, DeleteTodoParams>(
		async ({ id }) => deleteTodo(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['todo']);
			},
		}
	);

	const onClickDelete = (id: string) => {
		deleteTodoMutation.mutate({ id });
	};

	const onClickTodo = (title: string, content: string) => {
		setSelectedTodo({
			title,
			content,
		});
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
					<li
						key={todo.id}
						onClick={() => onClickTodo(todo.title, todo.content)}>
						<p>{todo.title}</p>
						<button onClick={() => onClickDelete(todo.id)}>x</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
