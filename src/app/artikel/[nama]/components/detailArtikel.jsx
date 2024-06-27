import { Button, Card, CardBody, Chip, Image, User } from "@nextui-org/react";
import parse from "html-react-parser";
import ShareComponent from "./share";
import { BadgeCheck } from "lucide-react";
import { format } from 'date-fns-tz';
import Artikel from "@/components/artikel";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default async function DetailArtikel({ artikel }) {
  const url = `https://obat-pedia.vercel.app/artikel/${artikel?.judul
    ?.toLowerCase()
    .replace(/ /g, "-")}`;
  const title = `${artikel?.judul}`;
  const timeZone = 'Asia/Jakarta'; 

  const formattedDate = format(artikel?.created_at, 'dd MMM yyyy ', { timeZone });

  const supabase = createClient();
  async function fetchArtikel() {
    try {
      let { data, error } = await supabase
        .from("artikel")
        .select(`*,id_kategori (*), id_apoteker (*)`)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .range(0,6)

      if (error) {
        console.error(error);
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  }
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + " ...";
    }
    return text;
  };

  const artikels = await fetchArtikel();
  console.log(artikels)
  return (
    <div className="container mx-auto p-2 mb-24 sm:mb-0">
      <div className=" flex flex-col justify-center sm:flex-row">
        <div className="max-w-3xl sm:w-8/12 mt-6 py-6 px-6 bg-white">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <User
                name={
                  <p className="text-md font-medium flex justify-center items-center gap-1">
                    Apt. {artikel?.id_apoteker?.nama} <BadgeCheck color="#0766AD" size={15}/>
                  </p>
                }
                description={<p className="text-md">{formattedDate}</p>}
                avatarProps={{
                  src: artikel?.id_apoteker?.picture,
                  size: "sm",
                }}
              />
              <div className="flex gap-4 justify-center items-center">
                <ShareComponent url={url} title={title}/>
              </div>
            </div>
            <h3 className="text-2xl font-bold">{artikel?.judul}</h3>
            <article>
              <div className="mb-6">
                <div className="flex justify-center mb-2 max-h-[23rem]">
                  <Image radius="none"
                    className="object-cover w-full h-full"
                    src={artikel?.gambar}
                  />
                </div>
              </div>
              <div>
                <div>{parse(artikel?.konten)}</div>
              </div>
            </article>
          </div>
        </div>
        <div className="sm:w-4/12 min-h-screen flex flex-col gap-2">
          <h3 className="mt-12 font-bold text-lg">Artikel Terkait</h3>
          {artikels?.map((artikel) => (
            <Card radius="none" className="h-42" isBlurred shadow="sm">
              <CardBody>
                <Link href={`/artikel/${artikel?.judul?.toLowerCase().replace(/ /g, "-")}`} className="flex flex-col sm:flex-row gap-4 h-full sm:items-center">
                  <div className="sm:h-32 h-42 sm:flex justify-center items-center">
                    <Image
                    isZoomed
                      className=" h-64 w-full sm:h-32 sm:w-48 object-cover"
                      radius="none"
                      alt="Album cover"
                      height={"100%"}
                      width={"100%"}
                      src={artikel?.gambar}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 mt-4 sm:mt-0 justify-center">
                    <div className="flex justify-between">
                      <Chip color="primary" size="sm">
                        {artikel?.id_kategori?.nama}
                      </Chip>
                    </div>
                    <h2 className="text-xs, font-semibold">
                      {truncateText(artikel?.judul, 60)}
                    </h2>
                    <div className="hidden text-sm sm:block">
                      {parse(truncateText(artikel?.konten, 60))}
                    </div>
                    <div className="flex gap-1 sm:gap-4 items-center">
                    </div>
                  </div>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
