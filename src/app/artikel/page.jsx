import { createClient } from "@/utils/supabase/client";
import ListArtikel from "./components/listArtikel";

export default async function Artikel() {
  const supabase = createClient();

  async function fetchArtikel() {
    try {
      let { data, error } = await supabase
        .from("artikel")
        .select(`*,id_kategori (*), id_apoteker (*)`)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const artikels = await fetchArtikel();
  return (
    <div className="container mx-auto px-6 py-4">
      <ListArtikel artikels={artikels} />
    </div>
  );
}