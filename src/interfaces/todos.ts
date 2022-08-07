export interface TodoRes {
	data: Todos;
}

export interface Todo {
	title: string;
	content: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTodoRes {
	data: Todo;
}

export type Todos = Array<Todo>;

export interface GetTodoByIdParams {
	id: string;
}

export interface CreateTodoParams {
	title: string;
	content: string;
}

export interface UpdateTodoParams {
	id: string;
	title: string;
	content: string;
}

export interface DeleteTodoParams {
	id: string;
}

export type CreateTodo = (params: CreateTodoParams) => Promise<TodoRes>;

export interface SignUpParams {
	email: string;
	password: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface LoginRes {
	message: string;
	token: string;
}

export interface SelectedTodo {
	id: string;
}
