"use client";
import { Chip, Image, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import parse from "html-react-parser";

export default function ListArtikel({ artikels }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + " ...";
    }
    return text;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredArtikels = artikels?.filter((artikel) =>
    artikel.judul?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto sm:px-14 py-6">
      <h3 className="text-lg font-semibold mb-4 sm:text-3xl">
        Artikel Kesehatan
      </h3>
      <Input
        onChange={handleSearchChange}
        value={searchQuery}
        variant="bordered"
        className="mb-4"
        size="md"
        type="search"
        placeholder="Cari artikel..."
      />
      {filteredArtikels.map((artikel) => (
        <div
          key={artikel.id}
          className="flex items-center gap-4 shadow-gray-200 shadow-sm py-3 rounded-lg mb-4 sm:w-3/4"
        >
          <div className="w-1/3 h-20 sm:h-full sm:w-[25rem]">
            <Image
              isZoomed={true}
              width={800}
              height={250}
              src={artikel?.gambar}
              alt="next ui"
              className="h-20 sm:h-44 sm:w-full"
            />
          </div>
          <div className="flex justify-center flex-col gap-1 w-2/3 sm:w-full">
            <Chip className="bg-sky-200 sm:mb-2" size="sm">
              {artikel?.id_kategori?.nama}
            </Chip>
            <Link
              href={`/artikel/${artikel?.judul
                ?.toLowerCase()
                .replace(/ /g, "-")}`}
              className="text-xs font-semibold sm:text-xl overflow-hidden h-10 sm:h-14"
            >
              {truncateText(artikel?.judul, 60)}
            </Link>
            <div className="text-justify overflow-y-hidden hidden sm:flex sm:h-18">
              {parse(truncateText(artikel?.konten, 130))}
            </div>
            <Link
              className="hidden sm:block text-red-600 font-semibold"
              href={`/artikel/${artikel?.judul
                ?.toLowerCase()
                .replace(/ /g, "-")}`}
            >
              Baca Selengkapnya
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
