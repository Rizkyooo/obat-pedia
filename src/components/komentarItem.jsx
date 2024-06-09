import { Avatar, Button, User } from "@nextui-org/react";

export default function KomentarItem() {
  return (
    <div className="bg-white gap-4 p-4 rounded-xl">
      <User
        name="Jane Doe"
        description="1 menit yg lalu"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          size: "sm",
        }}
      />
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos praesentium
        eius nulla maxime debitis quae alhi?
      </p>
      <p className="text-sm font-semibold mt-2 cursor-pointer w-fit py-2">Reply</p>
    </div>
  );
}
