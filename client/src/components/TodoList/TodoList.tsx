import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import { Divider } from "@mui/material";
import * as styles from "./TodoList.styles";
import { useTodos } from "../../hooks/useTodos";
import { useRecoilState } from "recoil";
import { confirmModalState, todoIdToDeleteState } from "../../recoil/atoms";
import { CreateTodoButton } from "../Buttons/CreateTodoButton";
import { CompleteBinButtons } from "../Buttons/CompleteBinButtons";
import { useTodoTemplate } from "./useTodoTemplate";

export const TodoList = () => {
  const { todos, fetchTodos, updateTodo } = useTodos();
  const [, setTodoIdToDeleteState] = useRecoilState(todoIdToDeleteState);
  const [, setconfModalState] = useRecoilState(confirmModalState);
  const { templateTitle, templateDescription } = useTodoTemplate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteClick = (id: string) => {
    setTodoIdToDeleteState(id);
    setconfModalState(true);
  };

  const onUpdateClick = (id: string, completed: boolean) => {
    updateTodo(id, completed);
    fetchTodos();
  };

  return (
    <Grid item xs={"auto"} md={"auto"} style={styles.grid}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
        ToDo list
      </Typography>
      <List>
        <Divider />
        {todos.length !== 0 ? (
          todos.map((todo) => (
            <React.Fragment key={todo._id}>
              <ListItem secondaryAction={<CompleteBinButtons todo={todo} />}>
                <ListItemAvatar>
                  <Avatar>
                    <ChecklistRtlOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={todo.title}
                  secondary={todo.description}
                  sx={styles.listItemText(todo.completed)}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <div>
            <ListItem secondaryAction={<CompleteBinButtons />}>
              <ListItemAvatar>
                <Avatar>
                  <ChecklistRtlOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={templateTitle}
                secondary={templateDescription}
              />
            </ListItem>
            <Divider />
          </div>
        )}
        <CreateTodoButton />
      </List>
    </Grid>
  );
};
