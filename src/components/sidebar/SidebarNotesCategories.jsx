import React from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuPlus,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { NavLink, useSearchParams } from "react-router";

export default function SidebarNotesCategories({
  setSideCategory,
  sideCategories,
  handleCategorySubmit,
  sideCategory,
  uiCategory,
  setUiCategory,
  deleteNoteCategory,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchParam(key, value) {
    setSearchParams((param) => {
      if (value === null) param.delete(key);
      else param.set(key, value);
      return param;
    });
  }
  return (
    <div className="relative">
      <div className="flex mt-8 items-center gap-4">
        <div
          onClick={() =>
            setUiCategory((prev) => ({ ...prev, form: !prev.form }))
          }
          className="hover:bg-neutral-300 cursor-pointer rounded-md p-1"
        >
          <LuPlus />
        </div>

        <div
          className={`${
            uiCategory.form ? "left-0 scale-100" : "-left-20 scale-0"
          } absolute z-50 bg-white rounded-lg border transition-all duration-300 border-neutral-300`}
        >
          <form onSubmit={handleCategorySubmit}>
            <div className="category-form p-2">
              <input
                type="text"
                value={sideCategory}
                onChange={(e) => {
                  setSideCategory(e.target.value);
                }}
                placeholder="enter category"
                className={`bg-white rounded-md px-3 w-[130px] border border-[#0284C5] focus:ring-2 focus:border-0 focus:outline-0 focus:ring-[#0284C5]`}
              />
              <button
                onClick={() =>
                  setUiCategory((prev) => ({ ...prev, form: false }))
                }
                className="hover:bg-neutral-300 cursor-pointer rounded-md p-1"
              >
                <LuX />
              </button>
              <button
                type="submit"
                className="hover:bg-neutral-300 cursor-pointer rounded-md p-1"
              >
                <LuPlus />
              </button>
            </div>
          </form>
        </div>

        <p className="capitalize grow text-lg flex items-center justify-between text-neutral-700">
          <span>categories</span>
          {sideCategories.length > 0 && (
            <span
              onClick={() => {
                setUiCategory((prev) => ({
                  ...prev,
                  dropdown: !prev.dropdown,
                }));
              }}
              className="hover:bg-neutral-300 cursor-pointer rounded-md p-1"
            >
              {uiCategory.dropdown ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          )}
        </p>
      </div>
      <div
        className={`ml-7 ${
          uiCategory.dropdown
            ? "max-h-26 transition-all duration-300"
            : "max-h-0 p-0 transition-all duration-300"
        } overflow-y-auto overflow-hidden`}
      >
        <ul
          className={` h-full space-y-1 py-3  *:hover:bg-[#324052] *:px-3 *:rounded-md *:hover:text-white *:cursor-pointer *:py-1 capitalize overflow-x-hidden overflow-auto`}
        >
          {sideCategories.length > 0
            ? sideCategories.map((item, i) => {
                return (
                  <NavLink
                    onClick={() => {
                      handleSearchParam("category", item.toString());
                    }}
                    to={item}
                    state={{ search: item }}
                    key={i}
                    className={({ isActive }) => {
                      return isActive
                        ? "flex bg-[#324052] items-center text-white"
                        : "flex items-center";
                    }}
                  >
                    <li className="flex items-center justify-between w-full">
                      <div className="flex items-center overflow-hidden gap-2">
                        <span className="w-4 h-4 bg-[#0284C5] rounded-full block"></span>
                        <span className=" font-semibold overflow-hidden">
                          {item}
                        </span>
                      </div>
                      <div>
                        {i !== 0 && (
                          <span
                            onClick={() => {
                              deleteNoteCategory(item);
                            }}
                            className="hover:text-red-400"
                          >
                            <LuTrash2 />
                          </span>
                        )}
                      </div>
                    </li>
                  </NavLink>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}
