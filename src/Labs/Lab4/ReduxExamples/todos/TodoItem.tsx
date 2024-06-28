import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <li key={todo.id} className="list-group-item d-flex flex-row-reverse">
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        className="btn btn-danger ms-2"
      >
        Delete
      </button>
      <button
        className="btn btn-primary ms-2"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        Edit
      </button>
      <p className="text-start flex-fill">{todo.title}</p>
    </li>
  );
}
