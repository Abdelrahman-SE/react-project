import React from "react";
import { useOutletContext } from "react-router";
import TodoItem from "./TodoItem";

export default function CompletedTodos() {
  const {
    allTodos,
    toggleComplete,
    dropdownIdTodo,
    setDropDownIdTodo,
    moveToDelete,
    setOpenEditTodoModal,
    setSelectedTodo,
  } = useOutletContext();

  const completedTodos = allTodos.filter((todo) => todo.completed);
  return (
    <div className="px-5">
      <div className="py-3">
        <h2 className="text-4xl capitalize font-bold">Completed Todos</h2>
        <h4 className="font-black capitalize">
          {completedTodos.length} completed
        </h4>
      </div>

      <div className=" grid grid-cols-3 max-[1090px]:grid-cols-2 max-[864px]:grid-cols-1 gap-2.5">
        {completedTodos.length === 0 ? (
          <p className="col-span-full text-center py-20 text-2xl text-gray-500">
            No completed todos yet - keep going! 🚀
          </p>
        ) : (
          completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              dropdownIdTodo={dropdownIdTodo}
              setDropDownIdTodo={setDropDownIdTodo}
              moveToDelete={moveToDelete}
              setOpenEditTodoModal={setOpenEditTodoModal}
              setSelectedTodo={setSelectedTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
