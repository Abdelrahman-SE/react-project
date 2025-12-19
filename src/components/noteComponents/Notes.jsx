import { useOutletContext, useParams } from "react-router";
import NoteItem from "./NoteItem";
import { useEffect } from "react";
import { deleteNote } from "../../services/notesApi";

export default function Notes() {
  const {
    allNotes,
    setAllNotes,
    allFavoriteNotesID,
    setAllFavoriteNotesID,
    moveNotesToTrash,
    setMoveNotesToTrash,
    dropdownNoteID,
    setDropdownNoteID,
    setOpenEditModal,
    setSelectedNote,
    searchQuery,
  } = useOutletContext();

  const { id: categoryParam } = useParams();

  const notesToShow = categoryParam
    ? allNotes.filter((note) => note.category === categoryParam)
    : allNotes;

  const searchedNote = searchQuery.trim().toLowerCase();

  const searchedNotesToShow = notesToShow.filter(
    (note) =>
      note.title.toLowerCase().includes(searchedNote) ||
      note.content.toLowerCase().includes(searchedNote)
  );

  useEffect(() => {
    localStorage.setItem("trashNotes", JSON.stringify(moveNotesToTrash));
    localStorage.setItem("favoriteNotes", JSON.stringify(allFavoriteNotesID));
  }, [moveNotesToTrash, allFavoriteNotesID]);

  async function moveToTrash(noteId) {
    const noteToMove = allNotes.find((item) => item.id === noteId);
    if (!noteToMove) return;

    try {
      await deleteNote(noteId);
      setAllNotes((prev) => prev.filter((item) => item.id !== noteId));
      setAllFavoriteNotesID((prev) => prev.filter((item) => item !== noteId));
      setMoveNotesToTrash((prev) => {
        return [...prev, noteToMove];
      });
    } catch (error) {
      console.log(error);
    }
  }

  function toggleAddToFavorites(noteid) {
    setAllFavoriteNotesID((prev) => {
      if (prev.includes(noteid)) {
        return prev.filter((id) => id !== noteid);
      } else {
        return [...prev, noteid];
      }
    });
  }

  function isFavorite(noteid) {
    if (allFavoriteNotesID.includes(noteid)) return true;
    return false;
  }

  return (
    <>
      <div className="px-5">
        <div className="py-3">
          <h2 className="text-4xl capitalize font-bold">
            {searchQuery
              ? "Search Results"
              : categoryParam
              ? categoryParam
              : "all notes"}
          </h2>
          <h4 className="font-black capitalize">{allNotes.length} notes</h4>
        </div>
        <div className="note-wrapper grid grid-cols-3 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 gap-2.5">
          {searchedNotesToShow.length === 0
            ? "no notes to show"
            : searchedNotesToShow.map((note) => {
                return (
                  <NoteItem
                    dropdownNoteID={dropdownNoteID}
                    setDropdownNoteID={setDropdownNoteID}
                    key={note.id}
                    note={note}
                    moveToTrash={() => {
                      moveToTrash(note.id);
                    }}
                    toggleAddToFavorites={() => {
                      toggleAddToFavorites(note.id);
                    }}
                    isFavorite={isFavorite(note.id)}
                    setOpenEditModal={setOpenEditModal}
                    setSelectedNote={setSelectedNote}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
