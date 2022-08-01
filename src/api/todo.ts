import { TodoRes } from 'interfaces/todos';
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
