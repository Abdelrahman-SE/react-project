import React from "react";
import { useOutletContext } from "react-router";
import TodoItem from "./TodoItem";
import DeletedTodoItem from "./DeletedTodoItem";
import { createTodo } from "../../services/todosApi";

export default function DeletedTodos() {
  const {
    setAllTodos,
    setMoveTodosToTrash,
    moveTodosToTrash,
    dropdownIdTodo,
    setDropDownIdTodo,
  } = useOutletContext();

  function permenantDelete(todoId) {
    setMoveTodosToTrash((prev) => prev.filter((t) => t.id !== todoId));
  }

  async function restoreTodos(todoId) {
    const todoToRestore = moveTodosToTrash.find((t) => t.id === todoId);
    if (!todoToRestore) return;
    try {
      const restoredTodo = await createTodo({
        text: todoToRestore.text,
        description: todoToRestore.description || "",
        completed: todoToRestore.completed || false,
        category: todoToRestore.category || [],
      });
      setAllTodos((prev) => [restoredTodo, ...prev]);
      setMoveTodosToTrash((prev) => prev.filter((t) => t.id !== todoId));
    } catch (error) {
      console.error("Failed to restore todo:", error);
    }
  }

  return (
    <>
      <div className="px-5">
        <div className="py-3">
          <h2 className="text-4xl capitalize font-bold">deleted todos</h2>
          <h4 className="font-black capitalize">
            {moveTodosToTrash.length} deleted
          </h4>
        </div>
        <div className=" grid grid-cols-3 max-[1090px]:grid-cols-2 max-[864px]:grid-cols-1 gap-2.5">
          {moveTodosToTrash.map((todo) => {
            return (
              <DeletedTodoItem
                key={todo.id}
                todo={todo}
                dropdownIdTodo={dropdownIdTodo}
                setDropDownIdTodo={setDropDownIdTodo}
                permenantDelete={permenantDelete}
                restoreTodos={restoreTodos}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
