import { Button, TextField } from "@mui/material";
import * as styles from "./CreateTodo.styles";

type CreateTodoProps = {
  isDisabled: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onCreateClick: () => void;
};

export const CreateTodo = ({
  isDisabled,
  setTitle,
  setDescription,
  onCreateClick,
}: CreateTodoProps) => {
  return (
    <div>
      <div style={styles.textField}>
        <TextField
          required
          size="medium"
          label="Add todo title"
          variant="outlined"
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div style={styles.textField}>
        <TextField
          size="medium"
          type="text"
          variant="outlined"
          label="Add todo description"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        disabled={isDisabled}
        onClick={() => onCreateClick()}
      >
        Create
      </Button>
    </div>
  );
};
