import { supabaseAuth } from "./supabaseClient";

export const fetchUserData = async (auth_id) => {
  try {
    const { data, error } = await supabaseAuth
      .from("users")
      .select()
      .eq("auth_id", auth_id);
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      return data[0];
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
