import { getUser } from "@/libs/actions";
import { redirect } from "next/navigation";
import CardData from "./components/cardData";
import { createClient } from "@/utils/supabase/client";
export default async function page() {
  const user = await getUser();
  const role = user?.user_metadata?.role;
  console.log(role);
  if (role !== "admin") {
    redirect("/");
  }
  const supabase = createClient();

  async function getApoteker() {
    try {
      const { data, error } = await supabase.from("apoteker").select("*");
      if (error) {
        return;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPengguna() {
    try {
      const { data, error } = await supabase.from("pengguna").select("*");
      if (error) {
        return;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getArtikel() {
    try {
      const { data, error } = await supabase.from("artikel").select("*");
      if (error) {
        return;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const [apoteker, pengguna, artikel] = await Promise.all([getApoteker(), getPengguna(), getArtikel()]);

  return (
    <>
      <main className="w-full bg-gray-100 min-h-screen container mx-auto p-6">
        <h3 className="text-lg font-semibold mb-8">Dashboard</h3>
        <div className="flex flex-wrap gap-4">
        <CardData name={"Apoteker"} total={apoteker?.length} />
        <CardData name={"Pengguna"} total={pengguna?.length} />
        <CardData name={"Artikel"} total={artikel?.length} />
        </div>
      </main>
    </>
  );
}
