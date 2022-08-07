import React, { useRef } from 'react';
import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { createTodo, fetchTodo, deleteTodo, updateTodo } from 'api/todo';
import {
	CreateTodoParams,
	DeleteTodoParams,
	Todo,
	TodoRes,
	UpdateTodoParams,
} from 'interfaces/todos';
import './index.css';

function TodoList({ setSelectedTodo, selectedTodo }: any) {
	const queryClient = useQueryClient();
	const inputRef = useRef<HTMLInputElement>(null);
	const { data } = useQuery<TodoRes, Error>(['todo'], fetchTodo);

	const addTodoMutation: UseMutationResult<TodoRes, Error, CreateTodoParams> =
		useMutation<TodoRes, Error, CreateTodoParams>(
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
		TodoRes,
		Error,
		DeleteTodoParams
	> = useMutation<TodoRes, Error, DeleteTodoParams>(
		async ({ id }) => deleteTodo(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['todo']);
			},
		}
	);

	const updateTodoMutation: UseMutationResult<
		TodoRes,
		Error,
		UpdateTodoParams
	> = useMutation<TodoRes, Error, UpdateTodoParams>(
		async ({ id, title, content }) => updateTodo(id, title, content),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['todo']);
			},
		}
	);
	const onClickDelete = (id: string) => {
		deleteTodoMutation.mutate({ id });
	};
	const onClickUpdate = (id: string, title: string, content: string) => {
		updateTodoMutation.mutate({ id, title, content });
	};

	const onClickTodo = (id: string) => {
		setSelectedTodo({
			id,
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
					<li key={todo.id} onClick={() => onClickTodo(todo.id)}>
						{todo.id === selectedTodo.id ? (
							<>
								<input type='text' value={todo.title} />
								<button
									onClick={() =>
										onClickUpdate(
											todo.id,
											inputRef?.current?.value as string,
											todo.content
										)
									}>
									변경
								</button>
								<button>취소</button>
							</>
						) : (
							<p>{todo.title}</p>
						)}
						<button onClick={() => onClickDelete(todo.id)}>x</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
