import { getUser } from "@/libs/actions";
import { redirect } from "next/navigation";
import EditProfil from "./editProfil";
import { createClient } from "@/utils/supabase/client";
export default async function Profil() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const supabase = createClient();
  async function fetchUser(id){
    try {
        if(!id){
            return
        }
        const {data, error} = await supabase
        .from("apoteker")
        .select("*")
        .eq("id", id)
        .single()
    
        if(error){
            console.log(error)
            return
        }
        return data
    } catch (error) {
        console.log(error)
    }
  }

  const users = await fetchUser(user?.id)


  return (
    <main className="sm:pb-16 pb-16 bg-gray-100">
      <EditProfil user={users}></EditProfil>
    </main>
  );
}
