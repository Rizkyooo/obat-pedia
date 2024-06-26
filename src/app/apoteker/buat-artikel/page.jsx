import { createClient } from "@/utils/supabase/client";
import Artikel from "./components/artikel";
import { getUser } from "@/libs/actions";
export default async function page() {
  const supabase = createClient();
  async function fetchArtikel(id) {
    if (!id) {
      return;
    }
    try {
      let { data, error } = await supabase
        .from("artikel")
        .select(`*,id_kategori (*)`)
        .eq("id_apoteker", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      }

      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const user = await getUser();
  const artikels = await fetchArtikel(user?.id);

  return (
    <div className="bg-gray-100 min-h-screen ml-1 mx-auto px-6 pt-6 mb-16 pb-24">
      <div className="container mx-auto ">
      <Artikel artikels={artikels} />
      </div>
    </div>
  );
}
