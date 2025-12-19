import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import Notes from "./components/noteComponents/Notes";
import Todos from "./components/todosComponents/Todos";
import FavoriteNotes from "./components/noteComponents/FavoriteNotes";
import DeletedNotes from "./components/noteComponents/DeletedNotes";
import CompletedTodos from "./components/todosComponents/CompletedTodos";
import DeletedTodos from "./components/todosComponents/DeletedTodos";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Notes />} />
            <Route path=":id" element={<Notes />} />
            <Route path="favoriteNotes" element={<FavoriteNotes />} />
            <Route path="deletedNotes" element={<DeletedNotes />} />
            <Route path="/todos">
              <Route index element={<Todos />} />
              <Route path="completedTodos" element={<CompletedTodos />} />
              <Route path="deletedTodos" element={<DeletedTodos />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
