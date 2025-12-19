import React from "react";
import img from "../../assets/star.png";
import { LuPen, LuSettings, LuStar, LuTrash2 } from "react-icons/lu";
import { formatDateEn } from "../../services/formatTime";

export default function FavoriteNotesItem({
  favoriteNote,
  dropdownNoteID,
  setDropdownNoteID,
  moveToTrash,
  removeFromFavorites,
}) {
  const isOpen = dropdownNoteID === favoriteNote.id;
  return (
    <div className="border-2 flex flex-col border-neutral-200 hover:bg-[#EEFCFC] rounded-lg p-4 bg-white relative overflow-hidden">
      <div
        className={`${
          isOpen ? "right-10 top-1 opacity-100 z-10" : "right-3 opacity-0 -z-10"
        } transition-all duration-300  top-0 absolute  p-1 bg-[#E1E7EF] border border-neutral-200 space-y-1 rounded-lg *:flex *:items-center *:gap-2`}
      >
        <div className="hover:bg-[#0284c5] hover:text-white p-1 cursor-pointer rounded-md">
          <div>
            <LuPen />
          </div>
          <p>Edit</p>
        </div>
        <div
          onClick={() => {
            removeFromFavorites(favoriteNote.id);
            setDropdownNoteID(null);
          }}
          className="hover:bg-yellow-500 hover:text-white p-1 cursor-pointer rounded-md"
        >
          <div>
            <LuStar />
          </div>
          <p className="capitalize">remove from favorites</p>
        </div>
        <div
          onClick={() => {
            moveToTrash(favoriteNote.id);
            setDropdownNoteID(null);
          }}
          className="hover:bg-red-500 hover:text-white p-1 cursor-pointer rounded-md"
        >
          <div>
            <LuTrash2 />
          </div>
          <p className="capitalize">move to trash</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-0.5">
        <h2 className="font-bold capitalize text-2xl line-clamp-1">{favoriteNote.title}</h2>
        <div className="flex items-center flex-col gap-3">
          <div
            onClick={() => {
              setDropdownNoteID(isOpen ? null : favoriteNote.id);
            }}
            className="text-2xl hover:rotate-90 transition-all relative cursor-pointer"
          >
            <LuSettings />
          </div>

          <img
            className={`top-12 rotate-180 absolute  w-7.5 inline-block hover:rotate-6 transition-all duration-900`}
            src={img}
            alt=""
          />
        </div>
      </div>
      <h3 className="text-neutral-400 mb-2 text-sm">
        {formatDateEn(favoriteNote.date_created)}
      </h3>
      <p className="line-clamp-3 text-md grow shrink-0">
        {favoriteNote.content}
      </p>
      <h4 className="mt-4 bg-[#0284C5] font-bold pointer-events-none capitalize text-xs w-fit px-3 py-1 rounded-2xl">
        {favoriteNote.category}
      </h4>
    </div>
  );
}
/**
 * <div
          className={`${
            isOpen ? "right-10 top-1 opacity-100 z-10" : "right-3 opacity-0 -z-10"
          } transition-all duration-300  top-0 absolute  p-1 bg-[#E1E7EF] border border-neutral-200 space-y-1 rounded-lg *:flex *:items-center *:gap-2`}
        >
          <div className="hover:bg-[#0284c5] hover:text-white p-1 cursor-pointer rounded-md">
            <div>
              <LuPen />
            </div>
            <p>Edit</p>
          </div>
          <div
            onClick={() => {
              toggleAddToFavorites();
              setDropdownNoteID(null);
            }}
            className="hover:bg-yellow-500 hover:text-white p-1 cursor-pointer rounded-md"
          >
            <div>
              <LuStar />
            </div>
            <p>add to favorites</p>
          </div>
          <div
            onClick={() => {
              moveToTrash();
              setDropdownNoteID(null);
            }}
            className="hover:bg-red-500 hover:text-white p-1 cursor-pointer rounded-md"
          >
            <div>
              <LuTrash2 />
            </div>
            <p>move to trash</p>
          </div>
        </div>
 */
