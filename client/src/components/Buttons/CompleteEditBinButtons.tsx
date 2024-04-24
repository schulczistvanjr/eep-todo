import { IconButton } from "@mui/material";
import { Todo } from "../../client.types";
import * as styles from "./CompleteEditBinButtons.styles";
import { useHover } from "@uidotdev/usehooks";
import { useRecoilState } from "recoil";
import {
  confirmModalState,
  editTodoModalState,
  todoIdToDeleteState,
} from "../../recoil/atoms";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useTodos } from "../../hooks/useTodos";

type CompleteEditBinButtonsProps = {
  todo?: Todo;
};

export const CompleteEditBinButtons = ({
  todo,
}: CompleteEditBinButtonsProps) => {
  const { fetchTodos, updateTodo } = useTodos();
  const [, setTodoIdToDeleteState] = useRecoilState(todoIdToDeleteState);
  const [, setconfModalState] = useRecoilState(confirmModalState);
  const [, setEditModalState] = useRecoilState(editTodoModalState);
  const [ref, hovering] = useHover();

  const handleDeleteClick = (id: string) => {
    setTodoIdToDeleteState(id);
    setconfModalState(true);
  };

  const onUpdateClick = async (todo: Todo) => {
    await updateTodo(todo);
    fetchTodos();
  };

  const onEditClick = (todo: Todo) => {
    setEditModalState({ isOpen: true, todo });
  };

  return !todo ? (
    <div style={(styles.iconContainer, styles.disabled)}>
      <IconButton disabled aria-label="complete">
        <TaskAltOutlinedIcon />
      </IconButton>
      <IconButton disabled aria-label="delete">
        <ModeEditOutlineOutlinedIcon />
      </IconButton>
      <IconButton disabled aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  ) : (
    <div key={todo._id} style={styles.iconContainer}>
      <IconButton
        aria-label="complete"
        onClick={() => onUpdateClick({ ...todo, completed: !todo.completed })}
      >
        <TaskAltOutlinedIcon style={styles.completeIcon(todo.completed)} />
      </IconButton>
      <IconButton ref={ref} aria-label="edit" onClick={() => onEditClick(todo)}>
        <ModeEditOutlineOutlinedIcon />
      </IconButton>
      <IconButton
        ref={ref}
        aria-label="delete"
        onClick={() => handleDeleteClick(todo._id)}
      >
        <DeleteIcon sx={styles.binIcon(hovering)} />
      </IconButton>
    </div>
  );
};
