import TulisArtikel from "./components/TulisArtikel";

  
export default function page() {

  return (
    <div className="container mx-auto p-6">
      <div>
      <h3 className="text-lg font-semibold">Tulis Artikel</h3>
      </div>
      <div className="mt-4">
        <TulisArtikel/>
      </div>
    </div>
  )
}
