import { Box, Button, Modal, Typography } from "@mui/material";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  onDeleteClick: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyles = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
  paddingTop: 25,
};

const button = {
  paddingLeft: 10,
  width: "100%",
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
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          justifyContent={"center"}
        >
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <div style={buttonStyles}>
          <Button style={button} variant="contained" onClick={onDeleteClick}>
            Yes
          </Button>
          <Button style={button} variant="outlined" onClick={handleClose}>
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
