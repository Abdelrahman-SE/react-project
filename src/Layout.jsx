import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "./components/sidebar/Sidebar";
import Input from "./components/sharedComponents/Input";
import Modal from "./components/sharedComponents/Modal";
import useCategories from "./services/useCategories";
import useNotes from "./services/useNotes";
import EditNoteModal from "./components/sharedComponents/EditNoteModal";
import TodoModal from "./components/sharedComponents/TodoModal";
import {
  deleteTodo,
  getAllTodos,
  toggleTodoComplete,
} from "./services/todosApi";
import EditTodoModal from "./components/sharedComponents/EditTodoModal";

export default function Layout() {
  const location = useLocation();
  const preservedWord = location.pathname.includes("todos");
  // NOTES FUNCTIONS
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { sideCategories, setSideCategories } = useCategories();
  const { allNotes, handleNoteCreated, setAllNotes } = useNotes();

  const [dropdownNoteID, setDropdownNoteID] = useState(null);

  const [allFavoriteNotesID, setAllFavoriteNotesID] = useState(() => {
    const savedNotes = localStorage.getItem("favoriteNotes");
    return savedNotes ? JSON.parse(localStorage.getItem("favoriteNotes")) : [];
  });
  const [moveNotesToTrash, setMoveNotesToTrash] = useState(() => {
    const saved = localStorage.getItem("trashNotes");
    return saved ? JSON.parse(saved) : [];
  });

  // TODOS FUNCTIONS
  const [dropdownIdTodo, setDropDownIdTodo] = useState(null);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openEditTodoModal, setOpenEditTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [moveTodosToTrash, setMoveTodosToTrash] = useState(() => {
    return localStorage.getItem("deletedTodos")
      ? JSON.parse(localStorage.getItem("deletedTodos"))
      : [];
  });

  const [createTodoCategory, setCreateTodoCategory] = useState("");
  const [allTodoCategory, setAllTodoCategory] = useState(() => {
    return localStorage.getItem("todoCategory")
      ? JSON.parse(localStorage.getItem("todoCategory"))
      : [
          "work",
          "personal",
          "shopping",
          "health",
          "urgent",
          "study",
          "home",
          "life",
        ];
  });
  useEffect(() => {
    localStorage.setItem("todoCategory", JSON.stringify(allTodoCategory));
    localStorage.setItem("deletedTodos", JSON.stringify(moveTodosToTrash));
  }, [allTodoCategory, moveTodosToTrash]);

  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then(setAllTodos);
  }, []);
  function handleTodoCreated(newTodo) {
    setAllTodos([...allTodos, newTodo]);
  }

  function onUpdateTodo(updatedTodo) {
    setAllTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }

  async function moveToDelete(todoId) {
    const todoToMove = allTodos.find((todo) => todo.id === todoId);
    if (!todoToMove) return;

    try {
      await deleteTodo(todoId);
      setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
      setMoveTodosToTrash((prev) => [...prev, todoToMove]);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  async function toggleComplete(todoId) {
    const todo = allTodos.find((t) => t.id === todoId);
    if (!todo) return;

    try {
      const updatedTodo = await toggleTodoComplete(todoId, todo.completed);

      setAllTodos((prev) =>
        prev.map((t) => (t.id === todoId ? updatedTodo : t))
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      setAllTodos((prev) =>
        prev.map((t) =>
          t.id === todoId ? { ...t, completed: todo.completed } : t
        )
      );
    }
  }

  function handleTodoCategory(newCategory) {
    setAllTodoCategory([...allTodoCategory, newCategory]);
  }

  const contextValue = {
    // notes
    setSelectedNote,
    selectedNote,
    sidebarExpanded,
    setSidebarExpanded,
    allNotes,
    setAllNotes,
    allFavoriteNotesID,
    setAllFavoriteNotesID,
    moveNotesToTrash,
    setMoveNotesToTrash,
    dropdownNoteID,
    setDropdownNoteID,
    //modals
    setOpenEditModal,
    setOpenEditTodoModal,
    // search
    setSearchQuery,
    searchQuery,
    // todos
    setDropDownIdTodo,
    dropdownIdTodo,
    allTodos,
    setAllTodos,
    handleTodoCreated,
    allTodoCategory,
    toggleComplete,
    moveToDelete,
    setMoveTodosToTrash,
    moveTodosToTrash,

    onUpdateTodo,
    selectedTodo,
    setSelectedTodo,
  };

  return (
    <>
      <section
        className={`relative ${
          sidebarExpanded ? "grid-cols-[280px_1fr]" : "grid-cols-[0px_1fr]"
        } w-full min-[768px]:grid transition-all duration-800`}
      >
        {openModal && (
          <Modal
            sideCategories={sideCategories}
            handleNoteCreated={handleNoteCreated}
            setOpenModal={setOpenModal}
          />
        )}
        {openTodoModal && (
          <TodoModal
            handleTodoCreated={handleTodoCreated}
            setOpenTodoModal={setOpenTodoModal}
            setCreateTodoCategory={setCreateTodoCategory}
            allTodoCategory={allTodoCategory}
            createTodoCategory={createTodoCategory}
            handleTodoCategory={handleTodoCategory}
          />
        )}
        {openEditModal && (
          <EditNoteModal
            sideCategories={sideCategories}
            note={selectedNote}
            onClose={() => {
              setOpenEditModal(false);
              setSelectedNote(null);
            }}
            onUpdate={(updatedNote) => {
              setAllNotes((prev) =>
                prev.map((note) =>
                  note.id === updatedNote.id ? updatedNote : note
                )
              );
            }}
          />
        )}
        {openEditTodoModal && (
          <EditTodoModal
            selectedTodo={selectedTodo}
            onUpdateTodo={onUpdateTodo}
            allTodoCategory={allTodoCategory}
            handleTodoCategory={handleTodoCategory}
            createTodoCategory={createTodoCategory}
            setCreateTodoCategory={setCreateTodoCategory}
            setOpenEditTodoModal={setOpenEditTodoModal}
          />
        )}
        <Sidebar
          moveNotesToTrash={moveNotesToTrash}
          allFavoriteNotesID={allFavoriteNotesID}
          allNotes={allNotes}
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
          sideCategories={sideCategories}
          setSideCategories={setSideCategories}
          allTodos={allTodos}
          moveTodosToTrash={moveTodosToTrash}
        />
        <main className="bg-[#F1F5F9] min-h-screen">
          <Input
            setOpenTodoModal={setOpenTodoModal}
            preservedWord={preservedWord}
            setOpenModal={setOpenModal}
            setSidebarExpanded={setSidebarExpanded}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />

          <Outlet context={contextValue} />
        </main>
      </section>
    </>
  );
}
