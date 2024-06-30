import { createClient } from "@/utils/supabase/client";
import ArtikelTable from "./components/ArtikelTable";

const columns = [
  {
    key: "judul",
    label: "Judul",
  },
  {
    key: "konten",
    label: "KONTEN",
  },
  {
    key: "created_at",
    label: "TANGGAL",
  },
  {
    key: "id_apoteker.nama",
    label: "PENULIS",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "aksi",
    label: "AKSI",
  },
];

export default async function page() {
  const supabase = createClient();
  async function getArtikel() {
    try {
      const { data, error } = await supabase
        .from("artikel")
        .select("*, id_apoteker(*)")
        .order("created_at", { ascending: true });

      if (error) {
        return error;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const artikels = await getArtikel();
  console.log(artikels)
  return (
    <main className="w-full bg-gray-100 min-h-screen container mx-auto p-6">
      <h3 className="text-lg font-semibold mb-8">Kelola Artikel</h3>
      <ArtikelTable columns={columns} rows={artikels} />
    </main>
  );
}
