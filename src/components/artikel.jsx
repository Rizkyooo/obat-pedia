import { Image, Chip } from "@nextui-org/react";
import Link from "next/link";
import parse from "html-react-parser";

export default function Artikel({ artikel }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + " ...";
    }
    return text;
  };

  return (
    <Link
      href={`/artikel/${artikel?.slug}`}
      className="flex items-center gap-4 text-black shadow-gray-200 shadow-sm py-3 rounded-lg mb-4 sm:w-3/4"
    >
      <div className="w-1/3 h-20 sm:h-full sm:w-[25rem] ">
        <Image
          isZoomed={true}
          width={800}
          height={250}
          src={artikel?.gambar}
          alt="next ui"
          className=" h-20 sm:h-44  sm:w-full "
        />
      </div>
      <div className="flex justify-center flex-col gap-1 w-2/3 sm:w-full">
        <Chip className=" bg-sky-200 sm:mb-2" size="sm">
          {artikel?.id_kategori?.nama}
        </Chip>
        <div className="text-xs font-semibold sm:text-xl overflow-hidden h-10 sm:h-14">
          {truncateText(artikel?.judul, 60)}
        </div>
        <div className=" text-justify overflow-y-hidden hidden sm:flex sm:h-18">
          {parse(truncateText(artikel?.konten, 130))}
        </div>
        <div className="hidden sm:block text-red-600 font-semibold">
          Baca Selengkapnya
        </div>
      </div>
    </Link>
  );
}
