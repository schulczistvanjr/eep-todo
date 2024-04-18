import { Box, Modal, Typography } from "@mui/material";
import * as styles from "./ConfirmModal.styles";
import { YesNoButtons } from "../Buttons/YesNoButtons";
import { useTodos } from "../../hooks/useTodos";
import { useRecoilState, useRecoilValue } from "recoil";
import { confirmModalState, todoIdToDeleteState } from "../../recoil/atoms";

type ConfirmModalProps = {
  title: string;
  description: string;
};

export const ConfirmModal = ({ title, description }: ConfirmModalProps) => {
  const { fetchTodos, deleteTodo } = useTodos();
  const [confModalState, setconfModalState] = useRecoilState(confirmModalState);
  const idToDelete = useRecoilValue(todoIdToDeleteState);

  const onConfirmDelete = async () => {
    await deleteTodo(idToDelete);
    setconfModalState(false);
    fetchTodos();
  };

  return (
    <Modal
      open={confModalState}
      onClose={() => setconfModalState(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <YesNoButtons
          primaryOnClick={onConfirmDelete}
          secondaryOnClick={() => setconfModalState(false)}
        />
      </Box>
    </Modal>
  );
};
