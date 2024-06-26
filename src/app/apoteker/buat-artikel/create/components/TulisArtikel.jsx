"use client";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Tiptap from "./Tiptap";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { getUser } from "@/libs/actions";
import { useRouter } from "next/navigation";

export default function TulisArtikel() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [kategori, setKategori] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [value, setValue] = useState(new Set([]));
  const [loading, setLoading] = useState(false);

  const handleContentChange = (reason) => {
    setContent(reason);
  };

  const supabase = createClient()
  async function getKategoriArtikel(){
    try{

      const {data, error} = await supabase
      .from("kategori_artikel")
      .select("*")
      .order("id", { ascending: false })
      if(error){
        console.log(error)
      }
      if(data){
        setKategori(data)
        return data
      }
    }catch{
      return
    }
  }

  useEffect(() => {
    getKategoriArtikel()
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && validTypes.includes(file.type)) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      console.log('Please select a valid image file (PNG, JPG, JPEG)');
    }
  };

  console.log(image);

  async function uploadImage(file) {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("artikel")
        .upload(`artikel/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if(error){
          console.log(error)
        }
        if(data){
          const { data: publicUrl, error: publicUrlError } = supabase.storage
            .from("artikel")
            .getPublicUrl(`artikel/${fileName}`);

          if (publicUrlError) {
            console.log(publicUrlError);
          }
          if (publicUrl) {
            console.log(publicUrl);
            return publicUrl;
          }
        }
    } catch (error) {
      console.log(error);
      
    }
  }
  const router = useRouter();

  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault();
    try {
      const userId = await getUser()
      if(image){
        const imageUrl = await uploadImage(image);
        const formattedTitle = title.replace(/-/g, ' ')
        const {data, error} = await supabase
        .from("artikel")
        .insert([{
          id_apoteker: userId?.id, 
          judul: formattedTitle, 
          konten: content, 
          gambar: imageUrl?.publicUrl, 
          id_kategori: parseInt(value.anchorKey),
          status: "on review"
        }])
        if(error){
          setLoading(false)
          toast.error(error?.message)
        }
          toast.success("Berhasil Submit Artikel")
          setLoading(false)
          console.log(data)
          router.push("/apoteker/buat-artikel")
      }
      
    } catch (error) {
      toast.error(error?.message)
      console.log(error);
    }
  }
  console.log(parseInt(value.anchorKey));  

  return (
    <div className="mb-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Select
          fullWidth
          variant="bordered"
          placeholder="Pilih kategori"
          selectedKeys={value}
          onSelectionChange={setValue}
        >
          {kategori.map((kategori) => (
            <SelectItem key={kategori?.id}>{kategori?.nama}</SelectItem>
          ))}
        </Select>
        <Input onChange={(e) => setTitle(e.target.value)} label="Judul" size="md" variant="bordered" />
        <div className="mt-4">
          <Tiptap
            content={content}
            onChange={(newContent) => handleContentChange(newContent)}
          />
          <div className="mt-4">
            <h3 className="text-md  mb-2">Upload Thumbnail Artikel</h3>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {previewUrl ? (
                  <div>
                    <Image
                    height={200}
                    width={200}
                      src={previewUrl}
                      alt="preview"
                      class="object-cover max-w-full h-64 rounded-lg"
                    />
                  </div>
                ): (
                  
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                )}
                <input onChange={handleFileChange} accept="image/png, image/jpeg" id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>
          <Button isDisabled={!content||!title||!previewUrl} isLoading={loading} type="submit" color="danger" className="mt-4">Submit Artikel</Button>
      </form>
    </div>
  );
}
