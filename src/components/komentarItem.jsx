"use client";
import { User, Button, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Komentar from "./komentar";
import { createClient } from "@/utils/supabase/client";

export default function KomentarItem({ comment,id_diskusi, depth = 0, penulis, role, picture }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (showReplies) {
      fetchReplies();
    }
  }, [showReplies]);

  const fetchReplies = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("komentar_diskusi")
      .select("*")
      .eq("parent_id", comment.id);

    if (error) {
      console.error(error);
    } else {
      setReplies(data);
    }
  };

  return (
    <>
      <div className="bg-white gap-4 p-4 rounded-xl" style={{ marginLeft: depth * 20 }}>
        <User
          name={penulis}
          description={role}
          avatarProps={{
            src: picture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            size: "sm",
          }}
        />
        <p className="text-sm">{comment.isi}</p>
        <div className="flex gap-4">
          <p
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-semibold cursor-pointer w-fit py-2"
          >
            Reply
          </p>
          <p
            onClick={() => setShowReplies(!showReplies)}
            className="text-xs font-semibold cursor-pointer w-fit py-2"
          >
            {showReplies ? 'Hide Replies' : 'Show Replies'}
          </p>
        </div>
      </div>
      {showReplies && (
        <div className="flex flex-col gap-2 pl-4">
          {replies.map((reply) => (
            <KomentarItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
          {isOpen && (
            <Komentar
            id_diskusi={id_diskusi}
              parent_id={comment?.id}
              onSubmit={() => {
                setIsOpen(false);
                fetchReplies();
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
