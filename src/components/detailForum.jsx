// components/detailForum.js
'use client';
import { User, Button } from "@nextui-org/react";
import Komentar from "./komentar";
import KomentarItem from "./komentarItem";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { getUser } from "@/libs/actions";

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

  useEffect(() => {
    fetchComments();
  }, []);

  // // id: '8a4a4969-8353-4e54-b22a-bb251971040d',
  // created_at: '2024-06-13T07:42:32.772599+00:00',
  // id_apoteker: null,
  // id_pengguna: '1328a25b-e42b-4f3e-983e-8c6f0df71b9f',
  // jml_like: null,
  // parent_id: null,
  // isi: 'test',
  // id_diskusi: 

  const fetchComments = async () => {
    const user = await getUser();
    const role = user?.user_metadata?.role || "pengguna";
    const userIdField = role === "apoteker" ? "id_apoteker" : "id_pengguna";
    const supabase = createClient();
    const { data, error } = await supabase
      .from("komentar_diskusi")
      .select(`id, created_at, isi, ${userIdField}(picture, nama, role), parent_id, jml_like, id_diskusi`)
      .eq("id_diskusi", id_diskusi)
      .is("parent_id", null);

    if (error) {
      console.error(error);
    } else {
      setComments(data);
      console.log(data);
    }
  };

  return (
    <>
      <div className="flex flex-col p-4 gap-4 bg-white rounded-lg w-full justify-start items-start h-full shadow-sm">
        <div className="flex items-center gap-2 justify-center w-full">
          <div className="w-full flex justify-between ">
            <User
              name={penulis}
              description={role}
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
              <p className="text-xs opacity-75">{jml_komentar} Komentar</p>
            </div>
            <p className="text-[0.6rem] sm:text-xs font-semibold opacity-65">
              {date}
            </p>
          </div>
        </div>
      </div>
      <Komentar id_diskusi={id_diskusi} onSubmit={fetchComments} />
      <h3 className="text-md sm:text-lg font-semibold">Komentar</h3>
      {comments.map((comment) => (
        <KomentarItem key={comment.id} penulis = {comment.id_pengguna?.nama || comment.id_apoteker?.nama} picture = {comment.id_pengguna?.picture || comment.id_apoteker?.picture} role = {comment.id_pengguna?.role || comment.id_apoteker?.role} comment={comment} id_diskusi={id_diskusi} />
      ))}
    </>
  );
}
