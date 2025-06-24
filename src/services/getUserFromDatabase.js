'use server'
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/libs/actions";
export async function getUserFromDatabase(role) {
  const user = await getUser();
  if (!user || !user.id) {
    console.log("No user or user.id found");
    return null;
  }
  const supabase = createClient();
  let { data: pengguna, error } = await supabase
    .from(role)
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log(error);
  }
  console.log(pengguna);
  return pengguna;
}
