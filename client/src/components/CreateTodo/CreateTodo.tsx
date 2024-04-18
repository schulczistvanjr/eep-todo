import { Button, TextField } from "@mui/material";

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
    <div style={{ padding: 0 }}>
      <div style={{ padding: 10 }}>
        <TextField
          required
          size="medium"
          label="Add todo title"
          variant="filled"
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div style={{ padding: 10 }}>
        <TextField
          size="medium"
          type="text"
          variant="filled"
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
