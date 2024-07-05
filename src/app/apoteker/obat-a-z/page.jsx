"use client";
import {  Input, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";

let tabs = [
  {
    id: "",
    label: "Semua Obat",
  },
  {
    id: "sakit kepala",
    label: "Nyeri dan Sakit Kepala",
  },
  {
    id: "demam",
    label: "Demam",
  },
  {
    id: "alergi",
    label: "Alergi",
  },
  {
    id: "pilek",
    label: "Pilek dan Flu",
  },
  {
    id: "maag",
    label: "Sakit Maag dan Refluks Asam",
  },
  {
    id: "hidung tersumbat",
    label: "Hidung Tersumbat",
  },
  {
    id: "batuk",
    label: "Batuk",
  },
  {
    id: "diare",
    label: "Diare",
  },
  {
    id: "sembelit",
    label: "Sembelit",
  },
  {
    id: "gatal",
    label: "Gatal dan Ruam Kulit",
  },
  {
    id: "vitamin",
    label: "Kekurangan Vitamin dan Mineral",
  },
];

const supabase = createClient();

export default function ObatAZ() {
  const [loadmore, setLoadmore] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [obatList, setObatList] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(false);

  const fetchObatData = async (limit, query = "", category = "") => {
    setLoading(true);
    let supabaseQuery = supabase
      .from("Obats")
      .select("title, id, tentang")
      .order("id", { ascending: true })
      .limit(limit);

    if (query) {
      supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
    }
    if (category) {
      supabaseQuery = supabaseQuery.ilike("tentang", `%${category}%`);
    }

    let { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error fetching data: ", error);
    } else {
      setObatList(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObatData(loadmore, searchQuery, activeTab);
  }, [loadmore, searchQuery, activeTab]);

  const handleMore = () => {
    setLoadmore(loadmore + 50);
  };

  return (
    <main className="min-h-screen mt-6">
      <div className="container mx-auto p-4 sm:px-24">
        <h2 className="text-xl font-bold mb-4">Temukan Obat</h2>
        <Input
          value={searchQuery}
          onChange={(e) => {
            e.preventDefault();
            setSearchQuery(e.target.value);
          }}
          size="lg"
          placeholder="Cari Obat"
          type="search"
          variant="bordered"
        />

        <Tabs
          className="overflow-auto max-w-full my-4"
          size="lg"
          aria-label="Dynamic tabs"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} title={tab.label}>
              <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-3">
                {
                  obatList.map((obat) => (
                    <Link
                      key={obat.id}
                      href={`/apoteker/obat-a-z/${obat.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/-$/, "")}?id=${obat.id}`}
                      prefetch={false}
                      className="py-4 hover:bg-gray-100  text-lg font-medium shadow-sm border-1 border-gray-200 bg-white rounded-lg px-4 mb-2"
                    >
                      {obat.title}
                    </Link>
                  ))
                      }
              </div>
            </Tab>
          ))}
        </Tabs>
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
