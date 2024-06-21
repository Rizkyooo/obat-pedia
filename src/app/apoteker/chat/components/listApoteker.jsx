"use client";
import { Input, User } from "@nextui-org/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function Listmessages({ messages, userId }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Use useMemo to memoize the filtered list
  const uniqueMessages = useMemo(() => {
    const unique = {};
    return messages?.filter((message) => {
      if (!unique[message.sender_name]) {
        unique[message.sender_name] = true;
        return true;
      }
      return false;
    });
  }, [messages]);

  // Use useMemo to memoize the filtered list based on search query
  const filteredMessages = useMemo(
    () =>
      uniqueMessages?.filter((message) =>
        message?.sender_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, uniqueMessages]
  );
  console.log(filteredMessages);
 

  return (
    <div
      className="w-full shadow-md sm:w-2/4 sm:flex flex-col bg-white px-6 py-4"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <Input
        onChange={handleSearchChange}
        startContent={<Search size={20} opacity={0.5} />}
        placeholder="cari messages"
        type="search"
        variant="bordered"
        className="mb-2"
      />

      {filteredMessages.map((message, index) => (
        <Link
          key={index}
          href={message?.sender_id!==userId?`/apoteker/chat/${message?.sender_id}`:`/apoteker/chat/${message?.receiver_id}`}
          className="flex justify-between px-2 py-4"
        >
          <User
            name={message?.sender_name}
            description={message?.message}
            avatarProps={{
              src:
                message?.sender_picture ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
              size: "sm",
            }}
          />
          <div>
            {/* <Chip size="sm" color="danger">
              {message?.message_count}
            </Chip> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
