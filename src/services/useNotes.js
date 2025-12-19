import { useEffect, useState } from "react";
import { getNotes } from "./notesApi";

export default function useNotes() {
  const [allNotes, setAllNotes] = useState([]);
  useEffect(() => {
    getNotes().then(setAllNotes);
  }, []);
  function handleNoteCreated(newNote) {
    setAllNotes([...allNotes, newNote]);
  }
  return { allNotes, handleNoteCreated, setAllNotes };
}
