import { atom } from "recoil";
import { Todo } from "../client.types";

export const todosState = atom<Todo[]>({
  key: "todosState",
  default: [],
});

type CreateTodoModalStateType = {
  isOpen: boolean;
  title: string;
  description: string;
};

export const createTodoModalState = atom<CreateTodoModalStateType>({
  key: "createTodoModalState",
  default: {
    isOpen: false,
    title: "",
    description: "",
  },
});

export const confirmModalState = atom({
  key: "confirmModalState",
  default: false,
});

export const todoIdToDeleteState = atom({
  key: "todoIdToDeleteState",
  default: "",
});
