import DetailForum from "@/components/detailForum"
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
export default async function page({ searchParams }) {
  const forumId = searchParams.id
  console.log(forumId)

  async function fetchForum() {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("diskusi")
        .select("*")
        .eq("id", forumId)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        const date = 
        console.log(date);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const forum = await fetchForum();
  return (
    <main className="min-h-screen">
        <div className="flex flex-col gap-2">
        <DetailForum id={forum?.id} date={formatDistanceToNow(new Date(forum?.created_at), { addSuffix: true, locale: localeID })} jml_komentar={forum?.jml_komentar} penulis={forum?.penulis} judul={forum?.judul} deskripsi={forum?.deskripsi} image={"/images/obat-icon.svg"}/>
        </div>

    </main>
  )
}
