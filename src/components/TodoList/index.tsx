import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodo } from 'api/todo';
import { Todo, TodoRes } from 'interfaces/todos';

function TodoList() {
	const { data, error } = useQuery<TodoRes, Error>(['todo'], fetchTodo);

	return (
		<ul>
			{data?.data?.map((todo: Todo) => (
				<li key={todo.id}>{todo.title}</li>
			))}
		</ul>
	);
}

export default TodoList;
