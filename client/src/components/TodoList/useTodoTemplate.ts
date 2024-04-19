import { todoTemplates } from "./constants";

export const useTodoTemplate = () => {
  const retVal =
    todoTemplates[Math.floor(Math.random() * todoTemplates.length)];

  return {
    templateTitle: retVal.title,
    templateDescription: retVal.description,
  };
};
