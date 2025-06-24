"use client";
import { User } from "@heroui/react";
import { useState, useEffect } from "react";
import Komentar from "./komentar";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/libs/actions";
import { BadgeCheck } from "lucide-react";

export default function KomentarItem({
  comment,
  id_diskusi,
  depth = 0,
  penulis,
  role,
  picture,
  route
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  
  const fetchReplies = async () => {
    const user = await getUser();
    const role = user?.user_metadata?.role || "pengguna";
    const userIdField = role === "apoteker" ? "id_apoteker" : "id_pengguna";
    const supabase = createClient();
    const { data, error } = await supabase
    .from("komentar_diskusi")
    .select(`id, created_at, isi, id_apoteker(picture, nama, role), id_pengguna(picture, nama, role), parent_id, jml_like, id_diskusi(id, judul)`)
      .eq("parent_id", comment.id);

    if (error) {
      console.error(error);
    } 
    if(data){
      setReplies(data);
    }
  };
  useEffect(() => {
      fetchReplies();
  }, []);
  return (
    <>
      <div
        className="bg-white gap-4 p-4 rounded-xl"
        style={{ marginLeft: depth * 20 }}
      >
        <User
          name={penulis}
          description={role==="apoteker"?(<span className="flex gap-1">Apoteker <BadgeCheck color="#0766AD" size={15}/></span>):"Pengguna"}
          avatarProps={{
            src:
              picture ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            size: "sm",
          }}
        />
        <p className="text-sm">{comment.isi}</p>
        <div className="flex gap-4">
          {depth < 1 && (
          <p
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-semibold cursor-pointer w-fit py-2"
          >
            Reply
          </p>
          )}
          {replies?.length>0 &&(
            <p
            onClick={() => setShowReplies(!showReplies)}
            className="text-xs font-semibold cursor-pointer w-fit py-2"
          > 
                {showReplies
                ? "Hide Replies"
                : `Show ${replies.length} Replies`
}
          </p>
          )}
          
        </div>
      </div>
      {showReplies && (
        <div className="flex flex-col gap-2 pl-4 ">
          {replies.map((reply) => (
            <KomentarItem key={reply.id} comment={reply} depth={depth + 1} penulis={reply?.id_pengguna?.nama || reply?.id_apoteker?.nama} role={reply?.id_pengguna?.role || reply?.id_apoteker?.role} picture={reply?.id_pengguna?.picture || reply?.id_apoteker?.picture}/>
          ))}
          
        </div>
      )}
      {isOpen && (
            <Komentar checkUser={false}
            route={route}
              id_diskusi={id_diskusi}
              parent_id={comment?.id}
              onSubmit={() => {
                setIsOpen(false);
                fetchReplies();
              }}
            />
          )}
    </>
  );
}
