import { useEffect, useState } from "react";
import "./App.css";
import { useTodos } from "./hooks/useTodos";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";
import { TodoList } from "./components/TodoList/TodoList";
import { ConfirmModal } from "./components/Modal/ConfirmModal";

function App() {
  const { todos, fetchTodos, createTodo, deleteTodo, updateTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const onCreateClick = () => {
    createTodo(title, description);
    setTitle("");
    setDescription("");
    fetchTodos();
  };

  const onDeleteClick = (id: string) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const onConfirmDelete = () => {
    deleteTodo(idToDelete);
    setOpen(false);
    fetchTodos();
  };

  const onUpdateClick = (id: string, completed: boolean) => {
    updateTodo(id, completed);
    fetchTodos();
  };

  return (
    <div className="App">
      <TodoList
        todos={todos || []}
        onDeleteClick={onDeleteClick}
        onUpdateClick={onUpdateClick}
      />
      <CreateTodo
        isDisabled={title === ""}
        setTitle={setTitle}
        setDescription={setDescription}
        onCreateClick={onCreateClick}
      />
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        onDeleteClick={onConfirmDelete}
        title="Delete"
        description="Are you sure want to delete this todo?"
      />
    </div>
  );
}

export default App;
