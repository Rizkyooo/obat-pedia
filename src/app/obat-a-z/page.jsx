"use client";
import { Card, CardBody, Input, Spinner } from "@heroui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import clsx from "clsx";

const supabase = createClient();

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function ObatAZ() {
  const [loadmore, setLoadmore] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [obatList, setObatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 400);

  const fetchObatData = async (limit, query = "", letter = "") => {
    setLoading(true);
    setError(null);
    let supabaseQuery = supabase
      .from("Obats")
      .select("title, id, tentang")
      .order("id", { ascending: true })
      .limit(limit);

    if (query) {
      supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
    } else if (letter) {
      supabaseQuery = supabaseQuery.ilike("title", `${letter}%`);
    }

    let { data, error } = await supabaseQuery;
    if (error) {
      setError("Gagal mengambil data obat. Silakan coba lagi.");
      setObatList([]);
    } else {
      setObatList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchObatData(loadmore, debouncedSearch, selectedLetter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadmore, debouncedSearch, selectedLetter]);

  const handleMore = () => setLoadmore((prev) => prev + 50);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setSearchQuery("");
    setLoadmore(50);
  };

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <main className="min-h-screen mt-6">
      <div className="container mx-auto p-4 sm:px-24">
        <h2 className="text-xl font-bold mb-4">Temukan Obat</h2>
        {/* A-Z Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {alphabet.map((letter) => (
            <button
            key={letter}
            className={clsx(
              "w-12 h-12 rounded-lg font-bold text-lg transition-colors",
              selectedLetter === letter
              ? "bg-blue-800 text-white"
              : "bg-blue-300 text-white hover:bg-blue-500"
            )}
            onClick={() => handleLetterClick(letter)}
            type="button"
            >
              {letter}
            </button>
          ))}
          {selectedLetter && (
            <button
            className="ml-2 px-3 py-2 rounded-lg bg-red-500 text-white text-sm"
            onClick={() => setSelectedLetter("")}
            type="button"
            >
              Reset
            </button>
          )}
        </div>
          <Input
            color="primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            placeholder="Cari Obat"
            type="search"
            aria-label="Cari Obat"
            className="mb-4"
            />
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spinner color="primary" size="md" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center my-4">{error}</div>
        ) : (
          <>
            <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-3 mt-6">
              {obatList.length === 0 ? (
                <div className="col-span-2 text-center text-gray-500 py-8">Tidak ada obat ditemukan.</div>
              ) : (
                obatList.map((obat) => (
                  <Link
                    key={obat.id}
                    href={`/obat-a-z/${obat.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/-$/, "")}?id=${obat.id}`}
                    prefetch={false}
                    className="py-4 hover:bg-gray-100 text-lg font-medium bg-white rounded-2xl px-4 mb-2"
                  >
                    {obat.title}
                  </Link>
                ))
              )}
            </div>
            <div className="flex justify-center mt-4">
              {obatList.length > 0 && (
                <Button onClick={handleMore} color="primary" variant="ghost">
                  Load More
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
