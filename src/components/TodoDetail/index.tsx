import { Todo } from 'interfaces/todos';
import React from 'react';

function TodoDetail({ selectedTodo }: any) {
	return (
		<>
			<p>{selectedTodo.title}</p>
			<p>{selectedTodo.content}</p>
		</>
	);
}

export default TodoDetail;
