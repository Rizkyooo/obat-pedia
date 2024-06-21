"use client";
import { Chip, Input, User } from "@nextui-org/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function Listmessages({ messages }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Use useMemo to memoize the filtered list
  const filteredmessages = useMemo(
    () =>
      messages?.filter((messages) =>
        messages?.sender_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, messages]
  );

  console.log(messages);

  return (
    <div
      className="w-full shadow-md sm:w-1/4 sm:flex flex-col bg-white px-6 py-4"
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

      {filteredmessages.map((message, index) => (
        <Link
          key={index}
          href={`/tanya-apoteker/chat/${message?.sender_id}`}
          className="flex justify-between px-2 py-4"
        >
          <User
            name={message?.sender_name}
            description={message?.last_message} // Display the complete last_message
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
