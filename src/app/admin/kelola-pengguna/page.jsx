import { createClient } from "@/utils/supabase/client";
import TablePengguna from "./components/TablePengguna";

const columns = [
  {
    key: "nama",
    label: "NAMA",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "jenis_kelamin",
    label: "JENIS KELAMIN",
  },
  {
    key: "aksi",
    label: "AKSI",
  },
  
];

export default async function page() {
  const supabase = createClient();
  async function getPengguna() {
    try {
      const { data, error } = await supabase
        .from("pengguna")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        return error;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const pengguna = await getPengguna();
  console.log(pengguna)
  return (
    <main className="w-full bg-gray-100 min-h-screen container mx-auto p-6">
      <h3 className="text-lg font-semibold mb-8">Kelola Pengguna</h3>
      <TablePengguna role={"pengguna"} columns={columns} rows={pengguna}/>
    </main>
  );
}
