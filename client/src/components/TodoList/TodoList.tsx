import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { Divider } from "@mui/material";
import * as styles from "./TodoList.styles";
import { useTodos } from "../../hooks/useTodos";
import { useRecoilState } from "recoil";
import { confirmModalState, todoIdToDeleteState } from "../../recoil/atoms";
import { CreateTodoButton } from "../Buttons/CreateTodoButton";

export const TodoList = () => {
  const { todos, fetchTodos, updateTodo } = useTodos();
  const [, setTodoIdToDeleteState] = useRecoilState(todoIdToDeleteState);
  const [, setconfModalState] = useRecoilState(confirmModalState);

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
    <Grid item xs={12} md={6} style={styles.grid}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        ToDo list
      </Typography>
      <List>
        <Divider />
        {todos &&
          todos.map((todo) => (
            <React.Fragment key={todo._id}>
              <ListItem
                secondaryAction={
                  <div>
                    <IconButton
                      edge="end"
                      aria-label="complete"
                      style={styles.iconButton}
                      onClick={() => onUpdateClick(todo._id, !todo.completed)}
                    >
                      <TaskAltOutlinedIcon
                        style={styles.completeIcon(todo.completed)}
                      />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(todo._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              >
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
          ))}
        <CreateTodoButton />
      </List>
    </Grid>
  );
};
