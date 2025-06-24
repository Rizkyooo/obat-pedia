import { Image, Chip } from "@heroui/react";
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
      className="flex flex-row items-center gap-4 text-black bg-white p-2 rounded-3xl mb-4 transition-transform hover:scale-[1.02] group"
      style={{ minHeight: '180px' }}
    >
      <div className="w-2/5 sm:w-56 flex-shrink-0 flex justify-center items-center">
        <Image
          isZoomed={true}
          width={200}
          height={136}
          src={artikel?.gambar}
          alt={artikel?.judul}
          className="rounded-2xl object-cover w-full h-28 sm:h-44 group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="flex flex-col justify-center gap-2 w-full px-2 sm:px-4">
        <Chip className="bg-sky-200 sm:mb-2 w-fit text-blue-800 font-semibold" size="sm">
          {artikel?.kategori?.nama}
        </Chip>
        <div className="text-base sm:text-xl font-bold line-clamp-3 leading-snug">
          {truncateText(artikel?.judul, 80)}
        </div>
      </div>
    </Link>
  );
}
