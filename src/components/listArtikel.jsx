import { createClient } from "@/utils/supabase/client";
import Artikel from "./artikel";
import Link from "next/link";
export default async function ListArtikel() {
  const supabase = createClient();
  async function fetchArtikel() {
    try {
      let { data, error } = await supabase
        .from("artikel")
        .select(`*,id_kategori (*), id_apoteker (*)`)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .range(0, 9);

      if (error) {
        console.error(error);
      }

      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const artikels = await fetchArtikel();
  return (
    <div className="container mx-auto sm:px-14">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4 sm:text-3xl">
          Artikel Kesehatan
        </h3>
        <Link className="text-blue-500 font-semibold sm:hidden pr-4" href={"/artikel"}>Lihat Semua</Link>
      </div>{" "}
      {artikels.map((artikel) => (
        <Artikel artikel={artikel}></Artikel>
      ))}
    </div>
  );
}
