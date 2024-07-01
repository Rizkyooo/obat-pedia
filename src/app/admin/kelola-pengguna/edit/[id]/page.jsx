
import { createClient } from "@/utils/supabase/client";
import EditProfil from "@/app/profil/editProfil";
import EditProfilApoteker from "@/app/apoteker/profil/editProfil";
export default async function EditPengguna({params}) {
  const {id} = params;
  const supabase = createClient();
  console.log(id.substring(id.indexOf('-') + 1));

  const userId = id.substring(id.indexOf('-') + 1)
  const role = id.substring(0, id.indexOf('-'))

  console.log(role, userId);


  async function fetchUser(id){
    try {
        if(!id){
            return
        }
        const {data, error} = await supabase
        .from(role)
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

  const users = await fetchUser(userId)
  


  return (
    <main className="sm:pb-16 bg-gray-100">
      {role !== "apoteker" ? <EditProfil user={users}></EditProfil> : <EditProfilApoteker user={users}></EditProfilApoteker>}
    </main>
  );
}
