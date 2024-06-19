"use client";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function ObatAZ() {
  const [loadmore, setLoadmore] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [obatList, setObatList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchObatData = async (limit, query = "") => {
    setLoading(true);
    let supabaseQuery = supabase
      .from("Obats")
      .select("title, id")
      .order('id', { ascending: true })
      .limit(limit);

    if (query) {
      supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
    }

    let { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error fetching data: ", error);
    } else {
      setLoading(false);
      setObatList(data);
    }
  };

  useEffect(() => {
    fetchObatData(loadmore, searchQuery);
  }, [loadmore, searchQuery]);

  const handleMore = () => {
    setLoadmore(loadmore + 50);
  };

  return (
    <main className="min-h-screen my-6 px-6">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Temukan Obat</h2>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="lg"
          placeholder="Cari Obat"
          type="search"
          variant="bordered"
        />
            {loading && (
                <div className="min-h-screen flex justify-center items-center">
                  <Spinner color="danger" size="lg" label="Loading" />
                </div>
              )}
        <div className="mt-10 flex flex-col sm:grid sm:grid-cols-2 sm:gap-3">
          {obatList.map((obat) => (
            <Link
              key={obat.id}
              href={`/apoteker/obat-a-z/${obat.title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/-$/, "")}?id=${obat.id}`}
              prefetch={false}
              className="py-4 text-lg font-medium bg-slate-100 rounded-lg px-4 mb-2"
            >
              {obat.title}
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {obatList.length > 0 && (
            <Button onClick={handleMore} color="danger" variant="ghost">
              Load More
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
