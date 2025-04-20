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
      className="flex items-center gap-4 text-black bg-white p-3 rounded-2xl mb-2 ">
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
      <div className="flex justify-center flex-col gap-1 w-2/3 sm:w-full px-4">
        <Chip className=" bg-sky-200 sm:mb-2" size="sm">
          {artikel?.id_kategori?.nama}
        </Chip>
        <div className="text-xs line-clamp-3 font-semibold sm:text-xl overflow-hidden sm:h-14">
          {artikel?.judul}
        </div>
      </div>
    </Link>
  );
}
