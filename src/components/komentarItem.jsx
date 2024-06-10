"use client";
import { Avatar, Button, User, Textarea } from "@nextui-org/react";
import Komentar from "./komentar";
import { useState } from "react";

export default function KomentarItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>
    <div className="bg-white gap-4 p-4 rounded-xl">
      <User
        name="Jane Doe"
        description="pengguna"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          size: "sm",
        }}
      />
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos praesentium
        eius nulla maxime debitis quae alhi?
      </p>
      <div className="flex gap-4">
        <p
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold  cursor-pointer w-fit py-2"
        >
          Reply
        </p>
        <p
          onClick={() => setShowReplies(!showReplies)}
          className="text-xs font-semibold  cursor-pointer w-fit py-2"
        >
          Show Replies
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-2 pl-4">
      <div
        className={`w-full bg-white rounded-xl h-32 ${
          showReplies ? "block" : "hidden"
        }`}
      ></div>
      <div className={isOpen ? "block" : "hidden"}>
        <Komentar />
      </div>
      </div>
    </>
  );
}
