import { Image, User } from "@nextui-org/react";
import parse from "html-react-parser";
import ShareComponent from "./share";
export default function DetailArtikel({ artikel }) {
  const url = `https://obat-pedia.vercel.app/artikel/${artikel?.judul
    ?.toLowerCase()
    .replace(/ /g, "-")}`;
  const title = `${artikel?.judul}`;

  return (
    <div className="container mx-auto p-6 bg-gray-100 mb-24 sm:mb-0">
      <div className="flex justify-center">
        <div className="max-w-3xl mt-6 py-6 px-6 bg-white p-4">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <User
                name={
                  <p className="text-md font-medium">
                    {artikel?.id_apoteker?.nama}
                  </p>
                }
                description={<p className="text-md">{artikel?.created_at}</p>}
                avatarProps={{
                  src: artikel?.id_apoteker?.picture,
                  size: "lg",
                }}
              />
              <div className="flex gap-4 justify-center items-center ">
                <p className="">Share on</p>
                <ShareComponent url={url} title={title}/>
              </div>
            </div>
            <h3 className="text-2xl font-bold">{artikel?.judul}</h3>
            <article>
              <div className="mb-6">
                <div className="flex justify-center mb-2 max-h-[23rem]">
                  <Image
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
      </div>
    </div>
  );
}
