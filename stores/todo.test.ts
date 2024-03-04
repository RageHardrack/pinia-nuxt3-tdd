import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { useTodoStore } from "~~/stores/todo";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useTodoStore>;

  beforeEach(() => {
    store = useTodoStore();
  });

  afterEach(() => {
    store.$reset();
  });

  test("creates a store", () => {
    expect(store).toBeDefined();
  });

  test("initializes with empty items", () => {
    expect(store.items).toStrictEqual([]);
  });

  test("creates a todo", () => {
    store.add({ title: "Test my code!" });

    expect(store.items![0]).toBeDefined();
    expect(store.items![0].title).toBe("Test my code!");
  });

  test("gets by id", () => {
    store.add({ title: "Test" });

    const item = store.items![0];
    const todo = store.getById(item.id);

    expect(todo).toStrictEqual(item);
  });

  test("gets ordered todos", () => {
    const items = [
      { createdAt: new Date(2021, 1, 1) },
      { createdAt: new Date(2024, 1, 61) },
      { createdAt: new Date(2020, 1, 23) },
    ];

    // @ts-ignore
    store.items = items;
    const orderedTodos = store.getOrderedTodos();

    expect(orderedTodos![0].createdAt.getFullYear()).toBe(2020);
    expect(orderedTodos![1].createdAt.getFullYear()).toBe(2021);
    expect(orderedTodos![2].createdAt.getFullYear()).toBe(2024);
    expect(store.items![0].createdAt.getFullYear()).toBe(2020);
  });

  test("removes a todo", () => {
    store.add({ title: "Test" });

    const todo = store.items![0];
    store.remove(todo.id);

    expect(store.items).toStrictEqual([]);
  });

  test("updates a todo", () => {
    store.add({ title: "Test" });

    const todo = store.items![0];
    store.update(todo.id, { done: true });

    expect(store.items![0].done).toBe(true);
  });

  test("update a todo title", () => {
    store.add({ title: "Test" });

    const todo = store.items![0];
    store.update(todo.id, { title: "Muchas gracias" });

    expect(store.items![0].title).toBe("Muchas gracias");
  })
});
