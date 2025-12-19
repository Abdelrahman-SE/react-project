import React from "react";
import { LuPanelRight } from "react-icons/lu";
import { NavLink, useLocation } from "react-router";

export default function SidebarHeader({ setSidebarExpanded }) {
  const location = useLocation();
  const isNotesSection = !location.pathname.startsWith("/todos");
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3 w-full">
        <NavLink
          to={"/"}
          className={() => {
            return isNotesSection
              ? "w-full capitalize font-bold text-2xl p-2 outline text-center outline-[#0284C5] bg-[#0284C5] rounded-md cursor-pointer text-white"
              : "w-full capitalize font-bold text-2xl p-2 text-center hover:bg-[#0284C5]  hover:text-white rounded-md cursor-pointer outline outline-[#0284C5]";
          }}
        >
          notes
        </NavLink>

        <NavLink
          to={"/todos"}
          className={({ isActive }) => {
            return isActive
              ? "w-full capitalize font-bold text-2xl p-2 text-center outline outline-[#0284C5] bg-[#0284C5] rounded-md cursor-pointer text-white"
              : "w-full capitalize font-bold text-2xl p-2 text-center hover:bg-[#0284C5] hover:text-white rounded-md cursor-pointer outline outline-[#0284C5]";
          }}
        >
          todos
        </NavLink>

        <button
          onClick={() => setSidebarExpanded((prev) => !prev)}
          className="hidden absolute -right-15 py-1 px-3 text-4xl rounded-2xl max-[768px]:flex justify-center items-center font-bold capitalize cursor-pointer hover:bg-[#0284c5d7]  bg-[#0284C5] text-white"
        >
          <LuPanelRight className="m-1" />
        </button>
      </div>
    </div>
  );
}
