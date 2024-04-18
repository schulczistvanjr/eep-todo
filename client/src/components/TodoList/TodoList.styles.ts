export const grid = {
  paddingLeft: 200,
  paddingRight: 200,
};

export const iconButton = {
  marginRight: 10,
};

export const completeIcon = (completed: boolean) => {
  return {
    color: completed ? "green" : "gray",
  };
};

export const listItemText = (completed: boolean) => {
  return {
    textDecoration: completed ? "line-through" : "",
  };
};
