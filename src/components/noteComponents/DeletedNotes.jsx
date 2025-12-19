import { useOutletContext } from "react-router";
import DeletedNotesItem from "./DeletedNotesItem";
import { useEffect } from "react";

export default function DeletedNotes() {
  const {
    setAllNotes,
    moveNotesToTrash,
    setMoveNotesToTrash,
    dropdownNoteID,
    setDropdownNoteID,
    searchQuery,
  } = useOutletContext();

  useEffect(() => {
    localStorage.setItem("trashNotes", JSON.stringify(moveNotesToTrash));
  }, [moveNotesToTrash]);

  function deleteNote(noteid) {
    setMoveNotesToTrash((prev) => prev.filter((item) => item.id !== noteid));
  }

  function addToNotes(noteid) {
    const noteToRestore = moveNotesToTrash.find((item) => item.id === noteid);
    if (!noteToRestore) return;

    setAllNotes((prev) => [...prev, noteToRestore]);
    setMoveNotesToTrash((prev) => prev.filter((item) => item.id !== noteid));
  }

  const searchedNotes = searchQuery.toLowerCase().trim();
  const deletedNotesSearch = moveNotesToTrash.filter(
    (note) =>
      note.title.toLowerCase().includes(searchedNotes) ||
      note.content.toLowerCase().includes(searchedNotes)
  );

  return (
    <>
      <div className="px-5">
        <div className="py-3">
          <h2 className="text-4xl capitalize font-bold">
            {searchQuery ? "Search Results" : "all deleted notes"}
          </h2>
          <h4 className="font-black capitalize">
            {moveNotesToTrash.length} notes
          </h4>
        </div>
        <div className="note-wrapper grid grid-cols-3 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 gap-2.5">
          {deletedNotesSearch.map((trashedNote) => {
            return (
              <DeletedNotesItem
                key={trashedNote.id}
                dropdownNoteID={dropdownNoteID}
                setDropdownNoteID={setDropdownNoteID}
                trashedNote={trashedNote}
                deleteNote={() => deleteNote(trashedNote.id)}
                addToNotes={() => addToNotes(trashedNote.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
