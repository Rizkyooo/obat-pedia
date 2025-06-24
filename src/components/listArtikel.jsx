import Artikel from "./artikel";
import Link from "next/link";
import { prisma } from "@/utils/prisma";

export default async function ListArtikel() {
  // Fetch only the latest 5 articles, including relations
  const artikels = await prisma.artikel.findMany({
    include: {
      apoteker: true,
      kategori: true,
    },
    orderBy: { created_at: "desc" },
    take: 5,
  });

  if (!artikels || artikels.length === 0) {
    return (
      <div className="container mx-auto sm:px-14">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-4 sm:text-3xl">
            Artikel Kesehatan
          </h3>
          <Link className="text-blue-500 font-semibold sm:hidden pr-4" href={"/artikel"}>
            Lihat Semua
          </Link>
        </div>
        <p className="text-gray-500">Tidak ada artikel saat ini.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto sm:px-14">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4 sm:text-3xl">
          Artikel Kesehatan
        </h3>
        <Link className="text-blue-500 md:text-lg font-semibold pr-4" href={"/artikel"}>
          Lihat Semua
        </Link>
      </div>
      {artikels.map((artikel) => (
        <Artikel key={artikel.id} artikel={artikel} />
      ))}
    </div>
  );
}
