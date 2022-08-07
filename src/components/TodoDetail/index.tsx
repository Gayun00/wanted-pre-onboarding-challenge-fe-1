import React, { useEffect, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getTodoById } from 'api/todo';
import { GetTodoByIdParams, TodoRes } from 'interfaces/todos';

function TodoDetail({ selectedTodo }: any) {
	const [todoDetail, setTodoDetail] = useState<any>({
		title: '',
		content: '',
		id: '',
		createdAt: '',
		updatedAt: '',
	});
	useEffect(() => {
		getTodoByIdMutation.mutate(selectedTodo);
	}, [selectedTodo]);
	const getTodoByIdMutation: UseMutationResult<
		TodoRes,
		Error,
		GetTodoByIdParams
	> = useMutation<TodoRes, Error, GetTodoByIdParams>(
		async ({ id }) => getTodoById(id),
		{
			onSuccess: (data: TodoRes, _variables: GetTodoByIdParams) => {
				console.log('result', data.data);
				setTodoDetail(data.data);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	return (
		<>
			<p>{todoDetail.title}</p>
			<p>{todoDetail.content}</p>
		</>
	);
}

export default TodoDetail;
