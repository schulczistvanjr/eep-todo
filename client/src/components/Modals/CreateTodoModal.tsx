import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { createTodoModalState } from "../../recoil/atoms";
import * as styles from "./CreateTodoModal.styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const CreateTodoModal = () => {
  const { isOpen, isEditing } = useRecoilValue(createTodoModalState);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={useResetRecoilState(createTodoModalState)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={styles.dialogTitle}>
        {isEditing ? "Edit ToDo" : "Create new ToDo"}
      </DialogTitle>
      <DialogActions>
        <CreateTodo />
      </DialogActions>
    </Dialog>
  );
};
