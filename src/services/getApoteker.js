"use server";

import { createClient } from "@/utils/supabase/server";

export async function getApoteker() {
  const supabase = createClient();
  let { data: apoteker, error } = await supabase.from("apoteker").select("*");

  if (error) {
    console.log(error);
  }
  if (apoteker) {
    return apoteker;
  }
}
