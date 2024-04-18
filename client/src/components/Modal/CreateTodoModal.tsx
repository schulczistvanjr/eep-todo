import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import * as styles from "./CreateTodoModal.styles";
import { Box } from "@mui/material";

type CreateTodoModalProps = {
  title: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onCreateClick: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const CreateTodoModal = ({
  title,
  setTitle,
  setDescription,
  onCreateClick,
}: CreateTodoModalProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button style={styles.button} variant="contained" onClick={handleClick}>
        Create new ToDo
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new ToDo"}</DialogTitle>
        <DialogActions>
          <CreateTodo
            title={title}
            setTitle={setTitle}
            setDescription={setDescription}
            onCreateClick={onCreateClick}
            handleClose={handleClick}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
