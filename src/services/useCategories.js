import { useEffect, useState } from "react";

export default function useCategories() {
  const [sideCategories, setSideCategories] = useState(() => {
    if (localStorage.getItem("notesCategories")) {
      return JSON.parse(localStorage.getItem("notesCategories"));
    } else {
      return ["uncategorized"];
    }
  });
  useEffect(() => {
    localStorage.setItem("notesCategories", JSON.stringify(sideCategories));
  }, [sideCategories]);

  return { sideCategories, setSideCategories };
}
