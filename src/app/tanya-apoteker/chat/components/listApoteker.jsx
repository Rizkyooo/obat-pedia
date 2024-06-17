'use client'
import { createClient } from "@/utils/supabase/client";
import { Chip, Input, User } from "@nextui-org/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function ListApoteker() {
    const [apoteker, setApoteker] = useState([]);
    useEffect(() => {
        const abort = new AbortController();
        async function getApoteker() {
            const supabase = createClient();
            const { data, error } = await supabase
              .from("apoteker")
              .select("*")
              .order("id", { ascending: true });
            if (error) {
              throw new Error(error.message);
            }
            setApoteker(data);
            return data;
        }
        getApoteker();
        return () => abort.abort();
    },[])

    console.log(apoteker);
  return (
    <div className="w-full shadow-md sm:w-1/4 sm:flex flex-col min-h-screen bg-white px-6 py-4">
      <Input
        startContent={<Search size={20} opacity={0.5} />}
        placeholder="cari apoteker"
        type="search"
        variant="bordered"
        className="mb-2"
      />

    {apoteker?.map((apoteker) => (
        
    <Link key={apoteker?.id} href={`/tanya-apoteker/chat/${apoteker?.id}`} className="flex justify-between  px-2 py-4">
        <User
          name={apoteker?.nama}
          description={"assalamualaikum"}
          avatarProps={{
            src: `${apoteker?.picture}` || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            size: "sm",
          }}
        />
        <div>
          <Chip size="sm" color="danger">
            10
          </Chip>
        </div>
      </Link>
    ))}

      
    </div>
  );
};