import { useEffect } from "react";
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
import { CreateTodoButton } from "../Buttons/CreateTodoButton";
import { CompleteBinButtons } from "../Buttons/CompleteBinButtons";
import { useTodoTemplate } from "./useTodoTemplate";

export const TodoList = () => {
  const { todos, fetchTodos } = useTodos();
  const { templateTitle, templateDescription } = useTodoTemplate();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Grid item xs={"auto"} md={"auto"} style={styles.grid}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
        ToDo list
      </Typography>
      <Divider />
      {todos.length !== 0 ? (
        todos.map((todo, i) => (
          <List key={todo._id}>
            <ListItem
              key={todo._id}
              secondaryAction={<CompleteBinButtons todo={todo} />}
            >
              <ListItemAvatar>
                <Avatar style={styles.avatar(todo.completed)}>
                  <ChecklistRtlOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={todo.title}
                secondary={todo.description}
                sx={styles.listItemText(todo.completed)}
              />
            </ListItem>
            <Divider key={i} />
          </List>
        ))
      ) : (
        <List>
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
        </List>
      )}
      <CreateTodoButton />
    </Grid>
  );
};
