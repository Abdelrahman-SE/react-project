import { supabase } from "./../supabaseClient";

// GET all notes
export const getNotes = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }

  return data || [];
};

// GET single note by id
export const getNote = async (id) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching note:", error);
    throw error;
  }

  return data;
};

export const createNote = async (newNote) => {
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title: newNote.title,
        content: newNote.content,
        category: newNote.category || "uncategorized",
      },
    ])
    .select();

  if (error) {
    console.error("Error creating note:", error);
    throw error;
  }

  return data[0];
};

export const updateNote = async (id, updatedNote) => {
  const { data, error } = await supabase
    .from("notes")
    .update({
      title: updatedNote.title,
      content: updatedNote.content,
      category: updatedNote.category,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating note:", error);
    throw error;
  }

  return data[0];
};

// DELETE note
export const deleteNote = async (id) => {
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
  return true;
};
