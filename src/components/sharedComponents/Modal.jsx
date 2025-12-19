import React, { useState } from "react";
import { createNote } from "../../services/notesApi";
// { isOpen, onClose, onSubmit }
export default function Modal({
  setOpenModal,
  sideCategories,
  handleNoteCreated,
}) {
  const [note, setNote] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    dateCreated: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function formatTime(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // تحويل 12 ساعة

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!note.title.trim()) return;
    try {
      const newNote = {
        ...note,
        dateCreated: formatTime(Date.now()),
      };
      const createdNote = await createNote(newNote);
      handleNoteCreated(createdNote);
      setNote({
        title: "",
        category: "uncategorized",
        content: "",
        dateCreated: "",
      });
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700/90">
      <div
        className="absolute inset-0"
        onClick={() => {
          setOpenModal(false);
        }}
        aria-hidden="true"
      />

      <div className="relative bg-[#F1F5F9] text-neutral-700 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold  mb-6">Create New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={(e) => handleChange(e)}
              placeholder="Enter note title..."
              required
              className="w-full px-3 py-2 rounded border border-[#0284C5] bg-white placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#0284C5]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={note.category}
              onChange={(e) => handleChange(e)}
              required
              className="w-full px-3 py-2 rounded border border-[#0284C5]  text-neutral-700 focus:outline-none"
            >
              <option value="" disabled>
                Select a category
              </option>
              {sideCategories.map((option, i) => (
                <option className="rounded-md" key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="5"
              required
              value={note.content}
              onChange={(e) => handleChange(e)}
              placeholder="Write your note here..."
              className="w-full px-3 py-2 rounded border border-[#0284C5] bg-white text-neutral-700 placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#0284C5] resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setOpenModal(false);
              }}
              className="px-4 py-2 cursor-pointer bg-[#0284C5] text-white rounded hover:bg-[#0284c5d6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-[#0284C5] text-white font-semibold rounded hover:bg-[#0284c5d6] transition"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
