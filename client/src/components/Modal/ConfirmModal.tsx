import { Box, Button, Modal, Typography } from "@mui/material";
import * as styles from "./ConfirmModal.styles";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  onDeleteClick: () => void;
};

export const ConfirmModal = ({
  title,
  description,
  open,
  handleClose,
  onDeleteClick,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
        <div style={styles.buttonStyles}>
          <Button
            style={styles.button}
            variant="contained"
            onClick={onDeleteClick}
          >
            Yes
          </Button>
          <Button
            style={styles.button}
            variant="outlined"
            onClick={handleClose}
          >
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
