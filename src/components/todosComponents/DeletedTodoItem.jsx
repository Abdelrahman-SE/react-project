import React from "react";
import { formatDateEn } from "../../services/formatTime";
import { LuPen, LuSettings, LuTrash2 } from "react-icons/lu";

export default function DeletedTodoItem({
  dropdownIdTodo,
  todo,
  setDropDownIdTodo,
  permenantDelete,
  restoreTodos,
}) {
  const isOpen = dropdownIdTodo === todo.id;

  return (
    <div className="border-2 border-neutral-200 hover:bg-[#EEFCFC] rounded-lg p-4 bg-white relative overflow-hidden">
      <div className="grid grid-cols-[1fr_auto] gap-3 mb-0.5">
        <div
          className={`${
            isOpen
              ? "right-10 top-1 opacity-100 z-10"
              : "right-3 opacity-0 -z-10 pointer-events-none"
          } transition-all duration-300  top-0 absolute  p-1 bg-[#E1E7EF] border border-neutral-200 space-y-1 rounded-lg *:flex *:items-center *:gap-2`}
        >
          <div
            onClick={() => {
              restoreTodos(todo.id);
              setDropDownIdTodo(null);
            }}
            className="hover:bg-[#0284c5] hover:text-white p-1 cursor-pointer rounded-md"
          >
            <div>
              <LuPen />
            </div>
            <p>Move To All Todos</p>
          </div>
          <div
            onClick={() => {
              // moveToTrash();
              //   moveToDelete(todo.id);
              permenantDelete(todo.id);
              setDropDownIdTodo(null);
            }}
            className="hover:bg-red-500 hover:text-white p-1 cursor-pointer rounded-md"
          >
            <div>
              <LuTrash2 />
            </div>
            <p>Permenant Delete</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center">
            <h2 className="font-bold capitalize text-2xl line-clamp-1">
              {todo.text}
            </h2>
          </div>
          <h3 className="text-neutral-400 mb-2 text-sm">
            {formatDateEn(todo.date_created)}
          </h3>
          <p className="line-clamp-3">{todo.description}</p>
          <div className=" flex flex-wrap gap-3">
            {todo.category &&
              todo.category.length > 0 &&
              todo.category.map((cat) => (
                <h4
                  key={cat}
                  className=" bg-[#0284C5] font-bold pointer-events-none capitalize text-xs w-fit px-3 py-1 rounded-2xl"
                >
                  {cat}
                </h4>
              ))}
          </div>
        </div>
        <div className="text-2xl  relative cursor-pointer">
          <LuSettings
            onClick={() => {
              setDropDownIdTodo(isOpen ? null : todo.id);
            }}
            className=" hover:rotate-90 transition-all "
          />
        </div>
      </div>
    </div>
  );
}
