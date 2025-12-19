import { LuNotebookTabs, LuStar, LuTrash2 } from "react-icons/lu";
import { NavLink } from "react-router";

export default function SidebarNotesSection({
  allNotes,
  allFavoriteNotesID,
  moveNotesToTrash,
  setSidebarExpanded,
}) {
  return (
    <ul className="text-md space-y-2">
      <li>
        <NavLink
          onClick={() => {
            setSidebarExpanded(false);
          }}
          to={"/"}
          className={({ isActive }) => {
            return isActive
              ? "py-1 px-3 rounded-lg w-full inline-block text-white bg-[#324052] font-bold"
              : "py-1 px-3 rounded-lg w-full inline-block hover:text-white hover:bg-[#324052] hover:font-bold";
          }}
        >
          <div className="flex items-center gap-4">
            <div className="">
              <LuNotebookTabs />
            </div>
            <p className="capitalize grow flex items-center justify-between mr-3">
              <span>all notes</span>
              <span>{allNotes.length}</span>
            </p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            setSidebarExpanded(false);
          }}
          to={"favoriteNotes"}
          className={({ isActive }) => {
            return isActive
              ? "py-1 px-3 rounded-lg w-full inline-block text-white bg-[#324052] font-bold"
              : "py-1 px-3 rounded-lg w-full inline-block hover:text-white hover:bg-[#324052] hover:font-bold ";
          }}
        >
          <div className="flex items-center gap-4">
            <div className="">
              <LuStar />
            </div>
            <p className="capitalize grow flex items-center justify-between mr-3">
              <span>favorites</span>
              <span>{allFavoriteNotesID.length}</span>
            </p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            setSidebarExpanded(false);
          }}
          to={"deletedNotes"}
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
              <span>{moveNotesToTrash.length}</span>
            </p>
          </div>
        </NavLink>
      </li>
    </ul>
  );
}
