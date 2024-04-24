import { useRecoilState } from "recoil";
import { todosState } from "../recoil/atoms";
import { Todo } from "../client.types";

const baseUrl = "api/todos";

export const useTodos = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  const fetchTodos = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  const createTodo = async (title: string, description: string) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      setTodos([...(todos || []), data.todo]);
    } catch (error) {
      console.error("Error creating todo: ", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setTodos(todos?.filter((todo) => todo._id !== data.id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const response = await fetch(`${baseUrl}/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        }),
      });
      const data = await response.json();
      setTodos(todos?.map((todo) => (todo._id === data.id ? data : todo)));
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  return { todos, fetchTodos, createTodo, deleteTodo, updateTodo };
};
