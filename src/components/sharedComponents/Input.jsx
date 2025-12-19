import { LuFileSearch, LuPanelLeft, LuPlus } from "react-icons/lu";

export default function Input({
  setSidebarExpanded,
  setOpenModal,
  searchQuery,
  setSearchQuery,
  preservedWord,
  setOpenTodoModal,
}) {
  return (
    <div className="flex sticky top-0 z-30 bg-[#F1F5F9] items-center px-5 border-b border-b-neutral-200 justify-between max-[425px]:flex-wrap max-[768px]:gap-3 gap-8 py-3">
      <button
        onClick={() => setSidebarExpanded((prev) => !prev)}
        className="py-1 px-3 cursor-pointer max-[425px]:order-1 text-4xl rounded-2xl max-[768px]:flex justify-center items-center font-bold capitalize bg-[#0284C5] hover:bg-[#0284c5d7]  text-white"
      >
        <LuPanelLeft className="m-1" />
      </button>
      <div className="grow max-[425px]:order-3 relative">
        <div className="absolute text-2xl left-3 top-3.5">
          <LuFileSearch />
        </div>
        <input
          type="text"
          value={searchQuery}
          className="max-w-75 w-full bg-white max-[540px]:w-full border-2 border-neutral-200 rounded-lg px-10 py-3"
          name="search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder={preservedWord ? "search todo" : "search note"}
        />
      </div>
      <button
        onClick={() => {
          if (preservedWord) {
            setOpenTodoModal(true);
          } else {
            setOpenModal(true);
          }
        }}
        className="py-1 cursor-pointer max-[425px]:order-2 px-3 text-4xl rounded-2xl max-[768px]:flex justify-center items-center font-bold capitalize bg-[#0284C5] hover:bg-[#0284c5d7]  text-white"
      >
        <LuPlus className="m-1" />
      </button>
    </div>
  );
}
