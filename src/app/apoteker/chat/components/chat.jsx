'use client';
import { createClient } from "@/utils/supabase/client";
import { Button, Input, User } from "@nextui-org/react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Chat({ id }) {
  const [apoteker, setApoteker] = useState(null);
  const scrollRef = useRef(null);

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
    setApoteker(data);
  }

  useEffect(() => {
    getApoteker(id);
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [apoteker]);

  return (
    <div className=" max-h-screen flex flex-col">
      <div className="px-4 z-50 sticky top-0 py-2 bg-gray-300 flex gap-1 items-center">
        <div className="flex gap-1 items-center">
          <Link href={`/apoteker/chat`}>
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
      
        <div ref={scrollRef} className="overflow-y-scroll mb-4 scroll-smooth max-h-screen bg-gray-100 flex justify-center">
          <div className="w-full flex flex-col items-center ">
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative self-start text-sm max-w-[50%] flex flex-col bg-white text-black px-2 py-1 rounded-lg shadow-md mb-4 ml-4">
              <p className="text-sm pt-1">Hai saya Apt. {apoteker?.nama} Apakah ada yang bisa kami bantu?</p>
              <p className="text-[0.55rem] px-2 self-end">1.48 PM</p>
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white border-b-[16px] border-b-transparent"></div>
            </div>
            <div className="relative max-w-[50%] self-end text-sm bg-[#EE0037] text-white px-2 py-1 rounded-lg shadow-md mb-4 mr-4 flex flex-col">
              <p className="text-sm pt-1">okey mantap nih</p>
              <p className="text-[0.55rem] self-end">1.48 PM</p>
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#EE0037] border-b-[16px] border-b-transparent"></div>
            </div>
          </div>
      </div>

      <div className="justify-center items-center w-full sticky flex bottom-2 gap-1 px-2 bg-gray-100">
        <Input
          className="bg-white rounded-full"
          type="text"
          variant="bordered"
          placeholder="masukkan pesan"
          size="lg"
          color="default"
          fullWidth
        />
        <Button color="danger" startContent={<Send size={20} />} size="md"></Button>
      </div>
    </div>
  );
}
