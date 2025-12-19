import { useState } from "react";
import TodoItem from "./TodoItem";
import { useOutletContext } from "react-router";

export default function Todos() {
  const {
    allTodos,
    allTodoCategory,
    dropdownIdTodo,
    setDropDownIdTodo,
    searchQuery,
    toggleComplete,
    moveToDelete,
    setOpenEditTodoModal,
    setSelectedTodo,
  } = useOutletContext();

  const [selectedCategories, setSelectedCategories] = useState([]);

  function filterByCategories(todos) {
    if (selectedCategories.length === 0) return todos;
    return todos.filter((todo) => {
      if (!todo.category) return false;
      for (let selectedCategory of selectedCategories) {
        if (todo.category.includes(selectedCategory)) return true;
      }
      return false;
    });
  }

  function filterBySearch(todos) {
    if (!searchQuery) return todos;
    const query = searchQuery.trim();
    return todos.filter((todo) => {
      return todo.text.trim().includes(query);
    });
  }

  function getFilteredTodos() {
    let result = allTodos;
    result = result.filter((todo) => !todo.completed);
    result = filterByCategories(result);
    result = filterBySearch(result);
    return result;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="px-5">
      <div className="py-3">
        <h2 className="text-4xl capitalize font-bold">
          {searchQuery ? "search results" : "all todos"}
        </h2>
        <h4 className="font-black capitalize">{allTodos.length} todos</h4>
        <div className="flex flex-wrap gap-4 mt-3 pb-5 border-b border-[#324052]/20">
          <button
            className="cursor-pointer bg-[#0284C5] text-white px-3 rounded-2xl"
            onClick={() => {
              setSelectedCategories([]);
            }}
          >
            Reset Filters
          </button>
          {allTodoCategory.map((cat, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedCategories((prev) => {
                    if (prev.includes(cat)) {
                      return prev.filter((c) => c !== cat);
                    } else {
                      return [...prev, cat];
                    }
                  });
                }}
                className={`${
                  selectedCategories.includes(cat)
                    ? "bg-[#0284C5] text-white"
                    : "bg-[#324052]"
                } text-[12px] cursor-pointer  text-white px-3 rounded-2xl`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      <div className="note-wrapper grid grid-cols-3 max-[1090px]:grid-cols-2 max-[864px]:grid-cols-1 gap-2.5">
        {filteredTodos.length === 0
          ? "No Todos To Show"
          : filteredTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  dropdownIdTodo={dropdownIdTodo}
                  setDropDownIdTodo={setDropDownIdTodo}
                  toggleComplete={toggleComplete}
                  moveToDelete={moveToDelete}
                  setOpenEditTodoModal={setOpenEditTodoModal}
                  setSelectedTodo={setSelectedTodo}
                />
              );
            })}
      </div>
    </div>
  );
}
