export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoState = {
  items: Todo[] | undefined;
};

export type TodoAdd = {
  title: string;
};

export type TodoUpdate = {
  title?: string;
  done?: boolean;
}