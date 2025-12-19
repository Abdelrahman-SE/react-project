import React, { useState } from "react";
import { updateNote } from "../../services/notesApi";

export default function EditNoteModal({
  note,
  sideCategories,
  onClose,
  onUpdate,
}) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "");

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedNote = {
      ...note,
      title: title.trim(),
      content: content.trim(),
      category,
    };

    try {
      await updateNote(note.id, updatedNote);
      onUpdate(updatedNote);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/70">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">
          Edit Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 focus:border-[#0284C5] focus:outline-none transition"
              placeholder="Note title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 focus:border-[#0284C5] focus:outline-none"
              required
            >
              <option value="" disabled>
                Choose category
              </option>
              {sideCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 focus:border-[#0284C5] focus:outline-none resize-none"
              placeholder="Write your thoughts..."
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-neutral-200 text-neutral-700 font-medium hover:bg-neutral-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[#0284C5] text-white font-bold hover:bg-[#02689d] transition shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
