import { createClient } from "@/utils/supabase/client";
import TablePengguna from "../kelola-pengguna/components/TablePengguna";
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
    key: "status_keanggotaan",
    label: "STATUS KEANGGOTAAN",
  },
  {
    key: "alamat",
    label: "ALAMAT",
  },
  {
    key: "no_sip",
    label: "NO SIP",
  },
  {
    key: "no_str",
    label: "NO STR",
  },
  {
    key: "pengalaman",
    label: "PENGALAMAN",
  },
  {
    key: "riwayat_pendidikan",
    label: "RIWAYAT PENDIDIKAN",
  },
  {
    key: "keahlian",
    label: "KEAHLIAN",
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
        .from("apoteker")
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

      <TablePengguna role="apoteker" columns={columns} rows={pengguna}/>
    </main>
  );
}
