export const binIcon = (hovering: boolean) => {
  return {
    color: hovering ? "red" : "gray",
  };
};
export const disabled = {
  cursor: "not-allowed",
};
export const completeIcon = (completed: boolean) => {
  return {
    color: completed ? "green" : "gray",
  };
};
export const iconContainer = {
  display: "flex",
  gap: 5,
};
