import {
  component$,
  useSignal,
  useStore,
  $,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { isBrowser } from '@builder.io/qwik/build';
import { TodoItem } from '../components/TodoItem.tsx';

interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export default component$(() => {
  const input = useSignal('');
  const todosSignal = useStore<{ todos: Todo[] }>({
    todos: [],
  });

  useVisibleTask$(() => {
    const todoItems = localStorage.getItem('todos');
    if (todoItems !== null) {
      todosSignal.todos = JSON.parse(todoItems);
    }
  });

  useTask$(({ track }) => {
    track(() => todosSignal.todos);
    const update = () =>
      localStorage.setItem('todos', JSON.stringify(todosSignal.todos));

    if (isBrowser) {
      update();
    }
  });

  const handleClick = $(() => {
    const newTodo = {
      id: crypto.randomUUID(),
      content: input.value,
      completed: false,
    };

    todosSignal.todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todosSignal.todos));
    input.value = '';
  });

  const removeTodo$ = $((id: number) => {
    todosSignal.todos = todosSignal.todos.filter((todo) => todo.id != id);
  });

  const updateTodo$ = $((id: number) => {
    const index = todosSignal.todos.findIndex((todo: Todo) => todo.id === id);
    todosSignal.todos[index].completed = !todosSignal.todos[index].completed;
  });

  return (
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-2xl">
        <div class="mb-4">
          <h1 class="text-gray-900 text-4xl font-bold">Todo list</h1>
          <div class="flex mt-4">
            <input
              onKeyDown$={(e) => {
                if (e.key === 'Enter') {
                  handleClick();
                }
              }}
              bind:value={input}
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800 "
              placeholder="Add Todo"
            />
            <button
              onClick$={handleClick}
              class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500"
            >
              add
            </button>
          </div>
        </div>
        {todosSignal.todos.length > 0 &&
          todosSignal.todos.map((todo) => (
            <TodoItem
              updateTodo$={updateTodo$}
              removeTodo$={removeTodo$}
              key={todo.id}
              id={todo.id}
              content={todo.content}
              completed={todo.completed}
            />
          ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Todo List',
  meta: [
    {
      name: 'description',
      content: 'An obligatory todolist',
    },
  ],
};

function useClientEffect$(arg0: () => void) {
  throw new Error('Function not implemented.');
}
