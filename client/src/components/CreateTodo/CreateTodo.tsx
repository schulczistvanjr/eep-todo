import { TextField } from "@mui/material";
import * as styles from "./CreateTodo.styles";
import { YesNoButtons } from "../Buttons/YesNoButtons";
import { useTodos } from "../../hooks/useTodos";
import { createTodoModalState } from "../../recoil/atoms";
import { useRecoilState, useResetRecoilState } from "recoil";

export const CreateTodo = () => {
  const { createTodo } = useTodos();
  const [createModalState, setCreateModalState] =
    useRecoilState(createTodoModalState);
  const { title, description } = createModalState;

  return (
    <div style={styles.container}>
      <div style={styles.textFieldContainer}>
        <TextField
          required
          value={title}
          size="medium"
          label="Add title"
          variant="outlined"
          style={styles.textField}
          onChange={(e) =>
            setCreateModalState({
              ...createModalState,
              title: e.currentTarget.value,
            })
          }
        />
      </div>
      <div style={styles.textField}>
        <TextField
          size="medium"
          variant="outlined"
          value={description}
          style={styles.textField}
          label="Add description"
          onChange={(e) =>
            setCreateModalState({
              ...createModalState,
              description: e.currentTarget.value,
            })
          }
        />
      </div>
      <YesNoButtons
        primaryText="Create"
        secondaryText="Cancel"
        primaryDisabled={!createModalState.title}
        primaryOnClick={() => {
          createTodo(title, description);
          setCreateModalState({ title: "", description: "", isOpen: false });
        }}
        secondaryOnClick={useResetRecoilState(createTodoModalState)}
      />
    </div>
  );
};
