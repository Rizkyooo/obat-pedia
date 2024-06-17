import { createClient } from "@/utils/supabase/client";
import { Input, User } from "@nextui-org/react";
import { color } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function Chat({ id }) {
  async function getApoteker(id) {
    if (!id) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("apoteker")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  const apoteker = await getApoteker(id);
  console.log(apoteker);
  return (
    <div>
      <div className="px-4 py-2 bg-gray-100 flex gap-1 items-center">
        <div className="flex gap-1 items-center">
          <Link href={`/tanya-apoteker/chat`}>
            <ArrowLeft cursor={"pointer"} className="sm:hidden" />
          </Link>
          <User
            name={apoteker?.nama}
            avatarProps={{
              src:
                apoteker?.picture ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
              size: "sm",
            }}
          />
        </div>
      </div>
      <div className=" h-svh flex justify-center items-center">
        <div className="">belum ada pesan</div>
      </div>
      <div className="fixed w-full sm:w-1/2 bottom-2 px-2 bg-white">
        <Input
          type="text"
          variant="bordered"
          placeholder="masukkan pesan"
          size="md"
          color="default"
          fullWidth
        />
      </div>{" "}
    </div>
  );
}
