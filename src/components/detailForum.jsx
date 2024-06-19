'use client';
import { User, Button } from "@nextui-org/react";
import Komentar from "./komentar";
import KomentarItem from "./komentarItem";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { getUser } from "@/libs/actions";
import { usePathname } from "next/navigation";
import { BadgeCheck, MessageCircleMore } from "lucide-react";

export default function DetailForum({
  image,
  role,
  judul,
  deskripsi,
  penulis,
  jml_komentar,
  date,
  id_diskusi
}) {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(jml_komentar);
  const pathName = usePathname();

  const fetchComments = async () => {
    const user = await getUser();
    const role = user?.user_metadata?.role || "pengguna";
    const userIdField = role === "apoteker" ? "id_apoteker" : "id_pengguna";
    const supabase = createClient();
    const { data, error } = await supabase
      .from("komentar_diskusi")
      .select(`id, created_at, isi, id_apoteker(picture, nama, role), id_pengguna(picture, nama, role), parent_id, jml_like, id_diskusi(id, judul)`)
      .eq("id_diskusi", id_diskusi)
      .is("parent_id", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setComments(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = () => {
    fetchComments();
    setCommentCount(commentCount + 1); // Update the comment count
  };

  return (
    <>
      <div className="flex flex-col p-4 gap-4 bg-white rounded-lg w-full justify-start items-start h-full shadow-sm">
        <div className="flex items-center gap-2 justify-center w-full">
          <div className="w-full flex justify-between ">
            <User
              name={penulis}
              description={role==="apoteker"? (<span className="flex gap-1">Apoteker <BadgeCheck color="#0766AD" size={15}/></span>)  : "Pengguna"}
              avatarProps={{
                src: image,
                size: "sm",
              }}
            />
          </div>
        </div>

        <div className="w-full">
          <p className="text-sm sm:text-lg font-semibold mb-2 sm:mb-0">
            {judul}
          </p>
          <p className="sm:block text-sm mb-1">{deskripsi}</p>
          <div className="flex justify-between mt-6">
            <div className="flex gap-1">
              <MessageCircleMore
                className="text-slate-600 opacity-75"
                size={15}
              />
              <p className="text-xs opacity-75">{commentCount} Komentar</p>
            </div>
            <p className="text-[0.6rem] sm:text-xs font-semibold opacity-65">
              {date}
            </p>
          </div>
        </div>
      </div>
      <Komentar checkUser={false} route={pathName} id_diskusi={id_diskusi} onSubmit={handleCommentSubmit} />
      <h3 className="text-md sm:text-lg font-semibold">Komentar</h3>
      {comments.map((comment) => (
        <KomentarItem route={pathName} key={comment.id} penulis={comment.id_pengguna?.nama || comment.id_apoteker?.nama} picture={comment.id_pengguna?.picture || comment.id_apoteker?.picture} role={comment.id_pengguna?.role || comment.id_apoteker?.role} comment={comment} id_diskusi={id_diskusi} />
      ))}
    </>
  );
}
