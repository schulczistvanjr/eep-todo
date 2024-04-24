import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import { useRecoilValue } from "recoil";
import { createTodoModalState, editTodoModalState } from "../../recoil/atoms";
import * as styles from "./CreateTodoModal.styles";
import { EditTodo } from "../CreateTodo/EditTodo";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const CreateTodoModal = () => {
  const { isOpen: isCreateModalOpen } = useRecoilValue(createTodoModalState);
  const { isOpen: isEditModalOpen } = useRecoilValue(editTodoModalState);

  const isModalOpen = isCreateModalOpen || isEditModalOpen;

  return (
    <Dialog
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={styles.dialogTitle}>
        {isEditModalOpen ? "Edit Todo" : "Create new ToDo"}
      </DialogTitle>
      <DialogActions>
        {isEditModalOpen ? <EditTodo /> : <CreateTodo />}
      </DialogActions>
    </Dialog>
  );
};
