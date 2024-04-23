export const grid = {
  paddingLeft: 200,
  paddingRight: 200,
};

export const listItem = {
  minHeight: "80px",
  paddingTop: 0,
};

export const listItemText = (completed?: boolean) => {
  return {
    maxWidth: "85%",
    textDecoration: completed ? "line-through" : "",
  };
};

export const avatar = (completed: boolean) => {
  return {
    backgroundColor: completed ? "green" : "gray",
  };
};
