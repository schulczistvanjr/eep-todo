export const grid = {
  paddingLeft: 200,
  paddingRight: 200,
};

export const listItemText = (completed: boolean) => {
  return {
    textDecoration: completed ? "line-through" : "",
  };
};

export const avatar = (completed: boolean) => {
  return {
    backgroundColor: completed ? "green" : "gray",
  };
};
