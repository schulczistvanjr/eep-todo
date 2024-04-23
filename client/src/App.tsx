import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { ConfirmModal } from "./components/Modals/ConfirmModal";
import { CreateTodoModal } from "./components/Modals/CreateTodoModal";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <TodoList />
        <ConfirmModal
          title="Delete"
          description="Are you sure want to delete this todo?"
        />
        <CreateTodoModal />
      </div>
    </RecoilRoot>
  );
}

export default App;
