import DetailForum from "@/components/detailForum";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default async function Page({ searchParams }) {
  const forumId = searchParams.id;
  console.log(forumId);

  async function fetchForum() {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("diskusi")
        .select("id, created_at, judul, deskripsi, penulis, kategori, jml_komentar, id_pengguna(picture, nama, role), id_apoteker(picture, nama, role)")
        .eq("id", forumId)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const forum = await fetchForum();
  console.log(forum);

  return (
    <main className="min-h-screen sm:px-16">
      <div className="flex flex-col gap-2 pb-40">
        <DetailForum
          id_diskusi={forum?.id}
          kategori={forum?.kategori}
          image={
            forum?.id_pengguna?.picture ||
            forum?.id_apoteker?.picture ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          id={forum?.id}
          date={formatDistanceToNow(new Date(forum?.created_at), {
            addSuffix: true,
            locale: localeID,
          })}
          role={forum?.id_pengguna?.role || forum?.id_apoteker?.role || "pengguna"}
          jml_komentar={forum?.jml_komentar}
          penulis={forum?.id_pengguna?.nama || forum?.id_apoteker?.nama}
          judul={forum?.judul}
          deskripsi={forum?.deskripsi}
        />
      </div>
    </main>
  );
}
