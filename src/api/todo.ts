import {
	CreateTodoParams,
	DeleteTodoParams,
	LoginRes,
	SignUpParams,
	TodoRes,
	UpdateTodoParams,
} from 'interfaces/todos';
import { SERVER_URL } from 'utils/constants';

const token = localStorage.getItem('token')! as string;

const fetchRequest = async (endpoint: string, method: string, params?: any) => {
	if (method !== 'get') {
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

export const getTodoById = async (id: string): Promise<TodoRes> => {
	return fetchRequest(`/todos/${id}`, 'get', {
		id,
	});
};

export const createTodo = async (
	title: string | number | undefined,
	content: string | number | undefined
): Promise<CreateTodoParams> => {
	return fetchRequest('/todos', 'post', {
		title,
		content,
	});
};

export const updateTodo = async (
	id: string,
	title: string | number | undefined,
	content: string | number | undefined
): Promise<UpdateTodoParams> => {
	return fetchRequest(`/todos/${id}`, 'put', {
		title,
		content,
	});
};

export const deleteTodo = async (id: string): Promise<DeleteTodoParams> => {
	return fetchRequest(`/todos/${id}`, 'delete');
};

export const signup = async (
	email: string | undefined,
	password: string | undefined
): Promise<SignUpParams> => {
	return fetchRequest(`/users/create`, 'post', {
		email,
		password,
	});
};

export const login = async (
	email: string | undefined,
	password: string | undefined
): Promise<LoginRes> => {
	return fetchRequest(`/users/login`, 'post', {
		email,
		password,
	});
};
