import { IconButton } from "@mui/material";
import { Todo } from "../../client.types";
import * as styles from "./CompleteBinButtons.styles";
import { useTodoTemplate } from "../TodoList/useTodoTemplate";
import { useHover } from "@uidotdev/usehooks";
import { useRecoilState } from "recoil";
import { confirmModalState, todoIdToDeleteState } from "../../recoil/atoms";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { useTodos } from "../../hooks/useTodos";

type CompleteBinButtonsProps = {
  todo?: Todo;
};

export const CompleteBinButtons = ({ todo }: CompleteBinButtonsProps) => {
  const { fetchTodos, updateTodo } = useTodos();
  const [, setTodoIdToDeleteState] = useRecoilState(todoIdToDeleteState);
  const [, setconfModalState] = useRecoilState(confirmModalState);
  const [ref, hovering] = useHover();

  const handleDeleteClick = (id: string) => {
    setTodoIdToDeleteState(id);
    setconfModalState(true);
  };

  const onUpdateClick = (id: string, completed: boolean) => {
    updateTodo(id, completed);
    fetchTodos();
  };
  return !todo ? (
    <div style={(styles.iconContainer, styles.disabled)}>
      <IconButton disabled edge="end" aria-label="complete">
        <TaskAltOutlinedIcon />
      </IconButton>
      <IconButton disabled edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  ) : (
    <div key={todo._id} style={styles.iconContainer}>
      <IconButton
        edge="end"
        aria-label="complete"
        onClick={() => onUpdateClick(todo._id, !todo.completed)}
      >
        <TaskAltOutlinedIcon style={styles.completeIcon(todo.completed)} />
      </IconButton>
      <IconButton
        ref={ref}
        edge="end"
        aria-label="delete"
        onClick={() => handleDeleteClick(todo._id)}
      >
        <DeleteIcon sx={styles.binIcon(hovering)} />
      </IconButton>
    </div>
  );
};
