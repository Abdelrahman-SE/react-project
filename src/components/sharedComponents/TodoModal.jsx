import React, { useState } from "react";
import { createTodo } from "../../services/todosApi";
import { LuPlus } from "react-icons/lu";

export default function TodoModal({
  setOpenTodoModal,
  handleTodoCreated,
  createTodoCategory,
  setCreateTodoCategory,
  handleTodoCategory,
  allTodoCategory,
}) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      text: text.trim(),
      description: description.trim(),
      completed: false,
      category:
        selectedCategories.length > 0 ? selectedCategories : ["general"],
      createdAt: new Date().toISOString(),
    };

    try {
      const created = await createTodo(newTodo);
      handleTodoCreated(created);
      setText("");
      setDescription("");
      setSelectedCategories([]);
      setOpenTodoModal(false);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700/90">
      <div
        className="absolute inset-0"
        onClick={() => {
          setOpenTodoModal(false);
        }}
        aria-hidden="true"
      />

      <div className="relative bg-[#F1F5F9] text-neutral-700 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold  mb-6">Create New Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter todo title..."
              required
              className="w-full px-3 py-2 rounded border border-[#0284C5] bg-white placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#0284C5]"
            />
          </div>
          <div>
            <div className="flex gap-3 mb-3 items-center">
              <label htmlFor="category" className="block text-sm font-medium ">
                Categories
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="category"
                  name="category"
                  className="bg-white border w-full border-[#0284C5] rounded pl-3 focus:outline-2 focus:outline-[#0284C5] "
                  type="text"
                  value={createTodoCategory}
                  placeholder="Add Category..."
                  onChange={(e) => setCreateTodoCategory(e.target.value)}
                />
                <div
                  onClick={() => {
                    if (!createTodoCategory.trim()) return;
                    if (
                      allTodoCategory
                        .map((cat) => cat.toLowerCase())
                        .includes(createTodoCategory.trim())
                    ) {
                      setCreateTodoCategory("");
                      return;
                    }
                    handleTodoCategory(createTodoCategory);
                    setCreateTodoCategory("");
                  }}
                  className="border rounded border-[#0284C5] p-1 hover:bg-[#0284c5]/10 cursor-pointer"
                >
                  <LuPlus />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTodoCategory.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(cat)
                        ? prev.filter((c) => c !== cat)
                        : [...prev, cat]
                    );
                  }}
                  className={`px-4 py-2 cursor-pointer capitalize rounded-full text-sm font-medium transition ${
                    selectedCategories.includes(cat)
                      ? "bg-[#0284C5] text-white"
                      : "bg-white border-2 border-[#0284C5] text-[#0284C5] hover:bg-[#0284c5]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your todo here..."
              className="w-full px-3 py-2 rounded border border-[#0284C5] bg-white text-neutral-700 placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#0284C5] resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setOpenTodoModal(false);
              }}
              className="px-4 py-2 cursor-pointer bg-[#0284C5] text-white rounded hover:bg-[#0284c5d6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-[#0284C5] text-white font-semibold rounded hover:bg-[#0284c5d6] transition"
            >
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
