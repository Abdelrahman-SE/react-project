import React from "react";
import { LuNotepadText, LuSettings, LuTrash2 } from "react-icons/lu";
import { formatDateEn } from "../../services/formatTime";

export default function DeletedNotesItem({
  trashedNote,
  dropdownNoteID,
  setDropdownNoteID,
  deleteNote,
  addToNotes,
}) {
  const isOpen = dropdownNoteID === trashedNote.id;
  return (
    <div
      key={trashedNote.id}
      className="border-2 flex flex-col border-neutral-200 hover:bg-[#EEFCFC] rounded-lg p-4 bg-white relative overflow-hidden"
    >
      <div
        className={`${
          isOpen ? "right-10 top-1 opacity-100 z-10" : "right-3 opacity-0 -z-10"
        } transition-all duration-300  top-0 absolute  p-1 bg-[#E1E7EF] border border-neutral-200 space-y-1 rounded-lg *:flex *:items-center *:gap-2`}
      >
        <div
          onClick={() => {
            addToNotes(trashedNote.id);
            setDropdownNoteID(null);
          }}
          className="hover:bg-yellow-500 hover:text-white p-1 cursor-pointer rounded-md"
        >
          <div>
            <LuNotepadText />
          </div>
          <p className="capitalize">move to notes</p>
        </div>
        <div
          onClick={() => {
            deleteNote(trashedNote.id);
            setDropdownNoteID(null);
          }}
          className="hover:bg-red-500 hover:text-white p-1 cursor-pointer rounded-md"
        >
          <div>
            <LuTrash2 />
          </div>
          <p className="capitalize">Delete</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-0.5">
        <h2 className="font-bold capitalize text-2xl line-clamp-1">
          {trashedNote.title}
        </h2>
        <div className="flex items-center flex-col gap-3">
          <div
            onClick={() => {
              setDropdownNoteID(isOpen ? null : trashedNote.id);
            }}
            className="text-2xl hover:rotate-90 transition-all relative cursor-pointer"
          >
            <LuSettings />
          </div>
        </div>
      </div>
      <h3 className="text-neutral-400 mb-2 text-sm">
        {formatDateEn(trashedNote.date_created)}
      </h3>
      <p className="line-clamp-3 text-md grow shrink-0">
        {trashedNote.content}
      </p>
      <h4 className="mt-4 bg-[#0284C5] font-bold pointer-events-none capitalize text-xs w-fit px-3 py-1 rounded-2xl">
        {trashedNote.category}
      </h4>
    </div>
  );
}
