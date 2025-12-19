import React from "react";
import { useOutletContext } from "react-router";
import FavoriteNotesItem from "./FavoriteNotesItem";
import { deleteNote } from "../../services/notesApi";

export default function FavoriteNotes() {
  const {
    allNotes,
    setAllNotes,
    allFavoriteNotesID,
    setAllFavoriteNotesID,
    dropdownNoteID,
    setDropdownNoteID,
    setMoveNotesToTrash,
    searchQuery,
  } = useOutletContext();

  function removeFromFavorites(noteId) {
    setAllFavoriteNotesID((prev) => prev.filter((id) => id !== noteId));
  }

  const favNote = allNotes.filter((note) => {
    return allFavoriteNotesID.includes(note.id);
  });

  const searchedNote = searchQuery.toLowerCase().trim();

  const searchedNotesToShow = favNote.filter(
    (note) =>
      note.title.toLowerCase().includes(searchedNote) ||
      note.content.toLowerCase().includes(searchedNote)
  );

  const moveToTrash = async (noteId) => {
    const noteToMove = allNotes.find((n) => n.id === noteId);
    if (!noteToMove) return;

    try {
      await deleteNote(noteId);
      setAllNotes((prev) => prev.filter((n) => n.id !== noteId));
      setAllFavoriteNotesID((prev) => prev.filter((id) => id !== noteId));
      setMoveNotesToTrash((prev) => [...prev, noteToMove]);
    } catch (error) {
      console.error("Failed to move to trash:", error);
    }
  };

  return (
    <div className="px-5">
      <div className="py-3">
        <h2 className="text-4xl capitalize font-bold">
          {searchQuery ? "Search Results" : "all favorite notes"}
        </h2>
        <h4 className="font-black capitalize">
          {allFavoriteNotesID.length} notes
        </h4>
      </div>
      <div className="note-wrapper grid grid-cols-3 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 gap-2.5">
        {searchedNotesToShow.map((favoriteNote) => {
          return (
            <FavoriteNotesItem
              key={favoriteNote.id}
              dropdownNoteID={dropdownNoteID}
              setDropdownNoteID={setDropdownNoteID}
              favoriteNote={favoriteNote}
              moveToTrash={moveToTrash}
              removeFromFavorites={() => removeFromFavorites(favoriteNote.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
