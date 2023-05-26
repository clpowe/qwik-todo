import type { Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export interface TodosContext {
  todosSignal: Todo[];
}

export const todoContextId = createContextId<TodosContext>('todosContext');
