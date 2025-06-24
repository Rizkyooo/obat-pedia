'use client'
import { createClient } from "@/utils/supabase/client";
import { Accordion, AccordionItem, Image } from "@heroui/react";
import { useEffect, useState } from "react";

export default function ProfilapotekerId({apotekerId}) {
    const [apoteker, setApoteker] = useState([]);

    useEffect(() => {
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
            console.log(data)
            setApoteker(data);
            return data;
        }
        getApoteker(apotekerId);
    }, [apotekerId])
    console.log(apoteker)

  return (
    <div className="flex flex-col gap-4 items-center py-4 w-full bg-gray-50">
      <div className="w-1/2">
        <Image className="h-full" src={apoteker?.picture} />
      </div>

<div className="shadow-sm px-4 bg-white">

      <div className="flex flex-col gap-1">
        <div className="text-sm flex flex-col gap-1">
          <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
            <p className="font-semibold">Nama Lengkap</p>
            <p>Apt. {apoteker?.nama}</p>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-1">
          <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
            <p className="font-semibold">Nomor STR</p>
            <p>{apoteker?.no_str}</p>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-1">
          <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
            <p className="font-semibold">Tempat Praktik</p>
            <p>{apoteker?.status_keanggotaan}</p>
          </div>
        </div>

        <Accordion className=" shadow-sm px-2 bg-white rounded-md">
          <AccordionItem
            classNames={{
              title: "font-semibold text-[0.9rem]",
              content: "text-sm w-full",
            }}
            key="1"
            aria-label="Pengalaman"
            title="Pengalaman"
          >
            <p>{apoteker?.pengalaman}</p>
          </AccordionItem>
        </Accordion>

        <Accordion className=" shadow-sm px-2 bg-white rounded-md">
          <AccordionItem
            classNames={{
              title: "font-semibold text-sm",
              content: "text-sm",
            }}
            key="1"
            aria-label="Riwayat Pendidikan"
            title="Riwayat Pendidikan"
          >
            <p>{apoteker?.riwayat_pendidikan}</p>
          </AccordionItem>
        </Accordion>
      </div>
      </div>

    </div>
  );
}
