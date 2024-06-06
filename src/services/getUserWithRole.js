import { createClient } from "@/utils/supabase/client";

export const getUserWithRole = async (userId) => {
  const supabase = createClient();
  try {
    let { data: pengguna, error: penggunaError } = await supabase
      .from("pengguna")
      .select("*")
      .eq("id", userId)
      .single();

    if (penggunaError) {
      throw penggunaError;
    }

    if (pengguna) {
      console.log(pengguna);
      return pengguna;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const checkRolePengguna = async (userId) => {
  const supabase = createClient();
  try {
    let { data: pengguna, error: penggunaError } = await supabase
      .from("pengguna")
      .select("*")
      .eq("id", userId)
      .single();

    if (penggunaError) {
      throw penggunaError;
    }

    if (pengguna) {
      console.log(pengguna);
      return pengguna;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};


export const checkRoleApoteker = async (userId) => {
  const supabase = createClient();
  try {
    let { data: apoteker, error: apotekerError } = await supabase
      .from("apoteker")
      .select("*")
      .eq("id", userId)
      .single();

    if (apotekerError) {
      throw apotekerError;
    }

    if (apoteker) {
      console.log(apoteker);
      return apoteker;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};


export const checkRoleAdmin = async (userId) => {
  const supabase = createClient();
  try {
    let { data: admin, error: adminError } = await supabase
      .from("admin")
      .select("*")
      .eq("id", userId)
      .single();

    if (adminError) {
      throw adminError;
    }

    if (admin) {
      console.log(admin);
      return admin;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};
