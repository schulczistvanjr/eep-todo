import { TextField } from "@mui/material";
import * as styles from "./CreateTodo.styles";
import { YesNoButtons } from "../Buttons/YesNoButtons";
import { useTodos } from "../../hooks/useTodos";
import { editTodoModalState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { Todo } from "../../client.types";

export const EditTodo = () => {
  const { fetchTodos, updateTodo } = useTodos();

  const [editModalState, setEditModalState] =
    useRecoilState(editTodoModalState);

  const { todo } = editModalState;
  const { title, description } = editModalState.todo;

  const onClose = () => {
    setEditModalState({ isOpen: false, todo: {} as Todo });
  };

  const onPrimaryClick = async () => {
    await updateTodo(editModalState.todo);
    setEditModalState({ isOpen: false, todo: {} as Todo });

    fetchTodos();
  };

  return (
    <div style={styles.container}>
      <div style={styles.textFieldContainer}>
        <TextField
          required
          multiline
          value={title}
          size="medium"
          label="Title"
          style={styles.textField}
          onChange={(e) =>
            setEditModalState({
              ...editModalState,
              todo: { ...todo, title: e.currentTarget.value },
            })
          }
        />
      </div>
      <div style={styles.textField}>
        <TextField
          size="medium"
          variant="outlined"
          multiline
          value={description}
          style={styles.textField}
          label="Description"
          onChange={(e) =>
            setEditModalState({
              ...editModalState,
              todo: { ...todo, description: e.currentTarget.value },
            })
          }
        />
      </div>
      <YesNoButtons
        primaryText={"Done"}
        secondaryText="Cancel"
        primaryOnClick={() => onPrimaryClick()}
        secondaryOnClick={onClose}
      />
    </div>
  );
};
