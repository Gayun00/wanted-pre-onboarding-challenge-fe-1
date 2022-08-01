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

export type Todos = Array<Todo>;
