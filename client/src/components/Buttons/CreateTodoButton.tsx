import { Button } from "@mui/material";
import * as styles from "./CreateTodoButton.styles";
import { createTodoModalState } from "../../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export const CreateTodoButton = () => {
  const [, setCreateModalState] = useRecoilState(createTodoModalState);
  const createModalState = useRecoilValue(createTodoModalState);

  return (
    <Button
      style={styles.button}
      variant="contained"
      onClick={() => setCreateModalState({ ...createModalState, isOpen: true })}
    >
      Create new ToDo
    </Button>
  );
};
