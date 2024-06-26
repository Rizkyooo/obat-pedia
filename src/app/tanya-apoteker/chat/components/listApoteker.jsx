"use client";
import { Input, User } from "@nextui-org/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust the import path as needed

const supabase = createClient(); // Create Supabase client

export default function Listmessages({ messages, userId }) {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(messages);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const calculateUnreadCount = (messages) => {
    const unreadCounts = {};
    messages.forEach((message) => {
      if (!message?.read_at && message?.receiver_id === userId) {
        const senderId = message.sender_id;
        if (!unreadCounts[senderId]) {
          unreadCounts[senderId] = 0;
        }
        unreadCounts[senderId]++;
      }
    });
    return unreadCounts;
  };

  const unreadCounts = calculateUnreadCount(messages);

  const filteredMessages = useMemo(
    () =>
      messages?.filter((message) =>
        message?.senderProfile?.nama?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, messages]
  );

  const handleLinkClick = async (senderId) => {

    // Update unread messages to read in the database
    const { error } = await supabase
      .from("messages")
      .update({ read_at: new Date() })
      .or(`sender_id.eq.${senderId},receiver_id.eq.${senderId}`)
      .is("read_at", null);

    if (error) {
      console.error("Error updating messages:", error.message);
    }
  };

  return (
    <div
      className="w-full sm:w-96 sm:flex flex-col bg-white px-6 py-4"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <Input
      size="md"
        onChange={handleSearchChange}
        startContent={<Search size={20} opacity={0.5} />}
        placeholder="cari pesan"
        type="search"
        variant="bordered"
        className="mb-2"
      />

      <div className="flex flex-col gap-1">

      {filteredMessages.map((message, index) => (
        <Link
          key={index}
          href={
            message?.sender_id !== userId
              ? `/tanya-apoteker/chat/${message.senderProfile?.id}`
              : `/tanya-apoteker/chat/${message.senderProfile?.id}`
          }
          className={` hover:bg-slate-200 flex justify-between px-2 py-4 shadow-sm border-b-1 rounded-md border-gray-100 ${unreadCounts[message.sender_id] > 0 ? "bg-gray-100" : "bg-white"}`}
          onClick={() => handleLinkClick(message?.sender_id)}
        >
          <User
          className={unreadCounts[message?.sender_id] > 0 ? "font-bold" : "font-normal"}
          name={(<p className="text-md font-medium"> {message?.senderProfile?.nama}</p>)}
            description={(<p className="text-md">{message?.message}</p>)}
            avatarProps={{
              src:
                message?.senderProfile?.picture ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
              size: "lg",
            }}
          />
          {unreadCounts[message?.sender_id] > 0 && (
            <div className="flex flex-col justify-center items-center">
              <div className="bg-red-500 animate-pulse text-white rounded-full p-1 text-xs">
              </div>
            </div>
          )}
        </Link>
      ))}
      </div>
    </div>
  );
}
