import ListArtikel from "./components/listArtikel";

async function fetchArtikel() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/getArticles`, {
    // next: { revalidate: 60 }, // Uncomment if you want ISR
    cache: 'no-store', // SSR, always fresh
  });
  if (!res.ok) throw new Error('Failed to fetch articles');
  const json = await res.json();
  return json.data || [];
}

export default async function Artikel() {
  const artikels = await fetchArtikel();
  return (
    <div className="container mx-auto px-6 py-4">
      <ListArtikel artikels={artikels} />
    </div>
  );
}