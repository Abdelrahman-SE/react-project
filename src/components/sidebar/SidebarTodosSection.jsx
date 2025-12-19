import { LuCheckCheck, LuNotebookTabs, LuTrash2 } from "react-icons/lu";
import { NavLink } from "react-router";

export default function SidebarTodosSection({ allTodos, moveTodosToTrash }) {
  const completedTodos = allTodos.filter((todo) => todo.completed);
  const notcompletedTodos = allTodos.filter((todo) => !todo.completed);
  return (
    <ul className="mt-3 text-md space-y-2">
      <li>
        <NavLink
          end
          to={"/todos"}
          className={({ isActive }) => {
            return isActive
              ? "py-1 px-3 rounded-lg w-full inline-block text-white bg-[#324052] font-bold"
              : "py-1 px-3 rounded-lg w-full inline-block hover:text-white hover:bg-[#324052] hover:font-bold ";
          }}
        >
          <div className="flex items-center gap-4">
            <div className="">
              <LuNotebookTabs />
            </div>
            <p className="capitalize grow flex items-center justify-between mr-3">
              <span>all todos</span>
              <span>{notcompletedTodos.length}</span>
            </p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"todos/completedTodos"}
          className={({ isActive }) => {
            return isActive
              ? "py-1 px-3 rounded-lg w-full inline-block text-white bg-[#324052] font-bold"
              : "py-1 px-3 rounded-lg w-full inline-block hover:text-white hover:bg-[#324052] hover:font-bold ";
          }}
        >
          <div className="flex items-center gap-4">
            <div className="">
              <LuCheckCheck />
            </div>
            <p className="capitalize grow flex items-center justify-between mr-3">
              <span>completed</span>
              <span>{completedTodos.length}</span>
            </p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"todos/deletedTodos"}
          className={({ isActive }) => {
            return isActive
              ? "py-1 px-3 rounded-lg w-full inline-block text-white bg-[#324052] font-bold"
              : "py-1 px-3 rounded-lg w-full inline-block hover:text-white hover:bg-[#324052] hover:font-bold ";
          }}
        >
          <div className="flex items-center gap-4">
            <div className="">
              <LuTrash2 />
            </div>
            <p className="capitalize grow flex items-center justify-between mr-3">
              <span>trash</span>
              <span>{moveTodosToTrash.length}</span>
            </p>
          </div>
        </NavLink>
      </li>
    </ul>
  );
}
