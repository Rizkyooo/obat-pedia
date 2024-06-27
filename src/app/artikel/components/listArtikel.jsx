"use client";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import Artikel from "@/components/artikel";

export default function ListArtikel({ artikels }) {
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
      {filteredArtikels.map((artikel) => (
        <Artikel key={artikel.id} artikel={artikel} />
      ))}
    </div>
  );
}
