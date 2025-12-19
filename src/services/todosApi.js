import { supabase } from "./../supabaseClient";

// GET all todos
export const getAllTodos = async () => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }

  return data || [];
};

// POST (create) new todo
export const createTodo = async (todo) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        text: todo.text,
        description: todo.description || "",
        completed: todo.completed || false,
        category: todo.category || [],
      },
    ])
    .select();

  if (error) {
    console.error("Error creating todo:", error);
    throw error;
  }

  return data[0];
};

export const updateTodo = async (id, updates) => {
  const { data, error } = await supabase
    .from("todos")
    .update({
      text: updates.text,
      description: updates.description,
      completed: updates.completed,
      category: updates.category,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating todo:", error);
    throw error;
  }

  return data[0];
};

// DELETE todo
export const deleteTodo = async (id) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }

  return true;
};

export const toggleTodoComplete = async (id, currentCompleted) => {
  const { data, error } = await supabase
    .from("todos")
    .update({ completed: !currentCompleted })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }

  return data[0];
};
