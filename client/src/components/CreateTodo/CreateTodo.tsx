import { TextField } from "@mui/material";
import * as styles from "./CreateTodo.styles";
import { YesNoButtons } from "../Buttons/YesNoButtons";
import { useRef } from "react";

type CreateTodoProps = {
  title: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onCreateClick: () => void;
  handleClose: () => void;
};

export const CreateTodo = ({
  title,
  setTitle,
  setDescription,
  onCreateClick,
  handleClose,
}: CreateTodoProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.textField}>
        <TextField
          required
          size="medium"
          label="Add title"
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
          label="Add description"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <YesNoButtons
        primaryText="Create"
        secondaryText="Cancel"
        primaryDisabled={title === ""}
        primaryOnClick={onCreateClick}
        secondaryOnClick={() => handleClose()}
      />
    </div>
  );
};
