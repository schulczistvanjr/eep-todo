import { TextField } from "@mui/material";
import * as styles from "./CreateTodo.styles";
import { YesNoButtons } from "../Buttons/YesNoButtons";
import { useTodos } from "../../hooks/useTodos";
import { createTodoModalState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export const CreateTodo = () => {
  const { createTodo } = useTodos();
  const [createModalState, setCreateModalState] =
    useRecoilState(createTodoModalState);

  const { title, description } = createModalState;

  const onPrimaryClick = async () => {
    await createTodo(title, description);
    setCreateModalState({ title: "", description: "", isOpen: false });
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
          multiline
          style={styles.textField}
          label="Description"
          onChange={(e) =>
            setCreateModalState({
              ...createModalState,
              description: e.currentTarget.value,
            })
          }
        />
      </div>
      <YesNoButtons
        primaryText={"Create"}
        secondaryText="Cancel"
        primaryDisabled={!title}
        primaryOnClick={() => onPrimaryClick()}
        secondaryOnClick={() =>
          setCreateModalState({ isOpen: false, title: "", description: "" })
        }
      />
    </div>
  );
};
