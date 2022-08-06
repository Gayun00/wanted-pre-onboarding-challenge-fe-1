import { CreateTodoParams, DeleteTodoParams, TodoRes } from 'interfaces/todos';
import { SERVER_URL } from 'utils/constants';

const token = localStorage.getItem('token')! as string;

const fetchRequest = async (endpoint: string, method: string, params?: any) => {
	if (params) {
		const res = await fetch(`${SERVER_URL}${endpoint}`, {
			method: method,
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(params),
		});
		if (res.ok) {
			return res.json();
		}

		throw new Error('Network response not ok');
	} else {
		const res = await fetch(`${SERVER_URL}${endpoint}`, {
			method: method,
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		});
		if (res.ok) {
			return res.json();
		}

		throw new Error('Network response not ok');
	}
};

export const fetchTodo = async (): Promise<TodoRes> => {
	return fetchRequest('/todos', 'get');
};

export const createTodo = async (
	title: string | number | undefined,
	content: string | number | undefined
): Promise<CreateTodoParams> => {
	return fetchRequest('/todos', 'post', {
		title: title,
		content: content,
	});
};

export const deleteTodo = async (id: string): Promise<DeleteTodoParams> => {
	return fetchRequest(`/todos/${id}`, 'delete');
};
