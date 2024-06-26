import { createClient } from "@/utils/supabase/client";
import DetailArtikel from "./components/detailArtikel";

export default async function page({params}) {
  const supabase = createClient()
  const { judul } = params;
  const decodedString = decodeURIComponent(judul);
  const formattedString = decodedString.replace(/-/g, ' '); 
  console.log(formattedString);

  async function fetchArtikel(judul) {
    if (!judul) {
      return;
    }
    try {
      let { data, error } = await supabase
        .from("artikel")
        .select(`*,id_kategori (*), id_apoteker (*)`)
        .eq("judul", judul)
        .single();
      if (error) {
        console.error(error);
      }
      if(data){
        console.log(data);
        return data;
      }
    
  }catch (error) {
    console.error(error);
  }
}

const artikel = await fetchArtikel(formattedString);
console.log(artikel);
  return (
    <div><DetailArtikel artikel={artikel}/></div>
  );
}
