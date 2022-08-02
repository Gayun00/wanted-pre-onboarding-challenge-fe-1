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

export interface CreateTodoParams {
	title: string;
	content: string;
}

export type CreateTodo = (params: CreateTodoParams) => Promise<TodoRes>;
