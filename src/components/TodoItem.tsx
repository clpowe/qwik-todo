import { component$, type PropFunction } from '@builder.io/qwik';

interface TodoProps {
  removeTodo$: PropFunction<(id:string) => void>
  updateTodo$: PropFunction<(id:string) => void>
  id: string;
  content: string;
  completed: boolean;
  
}

export const TodoItem = component$<TodoProps>((props) => {


  return (
    <div class="flex mb-4 items-center">
      <p class={["flex-1",props.completed ? 'w-full line-through text-grey-400':'w-full text-green-400']}>{props.content}</p>
      
      <button onClick$={()=>props.updateTodo$(props.id)} class={[" p-2 ml-4 mr-2 border-2 rounded ",props.completed ? 'text-teal-500 border-teal-500 ':' text-gray-400 border-gray-400 ']}>
      {props.completed ? 'Done':'Not Done'}
      </button>
      <button onClick$={() => props.removeTodo$(props.id)}  class=" p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">
        Remove
      </button>
    </div>
  );
});