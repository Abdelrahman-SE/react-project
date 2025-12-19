import { LuMoon, LuSun } from "react-icons/lu";
import SidebarHeader from "./SidebarHeader";
import SidebarNotesSection from "./SidebarNotesSection";
import SidebarNotesCategories from "./SidebarNotesCategories";
import { useState } from "react";
import SidebarTodosSection from "./SidebarTodosSection";

export default function Sidebar({
  sidebarExpanded,
  setSidebarExpanded,
  sideCategories,
  setSideCategories,
  allNotes,
  allFavoriteNotesID,
  moveNotesToTrash,
  allTodos,
  moveTodosToTrash,
}) {
  const [sideCategory, setSideCategory] = useState("");

  const [uiCategory, setUiCategory] = useState({
    form: false,
    dropdown: true,
  });

  function deleteNoteCategory(noteCategory) {
    setSideCategories((prev) => {
      return prev.filter((note) => note !== noteCategory);
    });
  }

  function handleCategorySubmit(e) {
    e.preventDefault();
    if (sideCategory.trim() === "") return;
    else if (sideCategories.includes(sideCategory)) return;
    setSideCategories((prev) => {
      return [...prev, sideCategory.trim()];
    });
    setUiCategory({ form: false, dropdown: true });
    setSideCategory("");
  }
  return (
    <aside
      className={`max-[768px]:fixed sticky top-0 max-[768px]:mt-0.5 max-[768px]:top-0 bg-white max-[768px]:z-90 left-0 text-nowrap ${
        sidebarExpanded
          ? "opacity-100 w-[280px] translate-x-0 transition-all duration-700"
          : "opacity-0 w-0 pointer-events-none -translate-x-70 transition-all duration-1000"
      } px-5 pt-5 flex flex-col justify-between h-screen border-r-2 border-r-neutral-200`}
    >
      <SidebarHeader setSidebarExpanded={setSidebarExpanded} />

      <div className="shrink-0 my-6">
        <p className="capitalize px-3 mb-3 font-bold text-md text-[#0F173D]">
          notes
        </p>

        <SidebarNotesSection
          moveNotesToTrash={moveNotesToTrash}
          allFavoriteNotesID={allFavoriteNotesID}
          allNotes={allNotes}
        />

        <SidebarNotesCategories
          sideCategories={sideCategories}
          sideCategory={sideCategory}
          setSideCategory={setSideCategory}
          handleCategorySubmit={handleCategorySubmit}
          uiCategory={uiCategory}
          setUiCategory={setUiCategory}
          deleteNoteCategory={deleteNoteCategory}
        />
      </div>

      <div className="shrink-0 grow">
        <p className="capitalize text-md text-[#0F173D]">todos</p>

        <SidebarTodosSection
          allTodos={allTodos}
          moveTodosToTrash={moveTodosToTrash}
        />
      </div>
    </aside>
  );
}
