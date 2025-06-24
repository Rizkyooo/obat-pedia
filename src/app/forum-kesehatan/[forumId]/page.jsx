import DetailForum from "@/components/detailForum";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default async function Page({ searchParams }) {
  const forumId = searchParams.id;
  let forum = null;
  let error = null;
  try {
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("diskusi")
      .select("id, created_at, judul, deskripsi, penulis, kategori, jml_komentar, id_pengguna(picture, nama, role), id_apoteker(picture, nama, role)")
      .eq("id", forumId)
      .single();
    if (fetchError) error = fetchError;
    forum = data;
  } catch (e) {
    error = e;
  }

  if (error || !forum) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-lg font-bold mb-2">Forum tidak ditemukan</h2>
          <p className="text-gray-500">Forum yang Anda cari tidak tersedia atau telah dihapus.</p>
        </div>
      </main>
    );
  }

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
