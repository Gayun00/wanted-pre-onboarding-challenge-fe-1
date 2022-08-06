import {
	CreateTodoParams,
	CreateTodoRes,
	DeleteTodoParams,
	TodoRes,
} from 'interfaces/todos';
import { SERVER_URL } from 'utils/constants';

const token = localStorage.getItem('token')! as string;

export const fetchTodo = async (): Promise<TodoRes> => {
	const res = await fetch(`${SERVER_URL}/todos`, {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	});
	if (res.ok) {
		return res.json();
	}

	throw new Error('Network response not ok');
};

export const createTodo = async (
	title: string | number | undefined,
	content: string | number | undefined
): Promise<CreateTodoParams> => {
	const res = await fetch(`${SERVER_URL}/todos`, {
		method: 'post',
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			title: title,
			content: content,
		}),
	});
	if (res.ok) {
		return res.json();
	}

	throw new Error('Network response not ok');
};

export const deleteTodo = async (id: string): Promise<DeleteTodoParams> => {
	const res = await fetch(`${SERVER_URL}/todos/${id}`, {
		method: 'delete',
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	});
	if (res.ok) {
		return res.json();
	}

	throw new Error('Network response not ok');
};
