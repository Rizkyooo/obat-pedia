"use client";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import Tiptap from "@/app/apoteker/buat-artikel/create/components/Tiptap";
import { useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns-tz";
import { BadgeCheck } from "lucide-react";

export default function DetailArtikel({ artikel }) {
  const [content, setContent] = useState(artikel?.konten);
  const [judul, setJudul] = useState(artikel?.judul);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewUrl, setPreviewUrl] = useState(artikel?.gambar);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeZone = "Asia/Jakarta";

  // const formattedDate = format(artikel?.created_at, 'dd MMM yyyy ', { timeZone });

  const supabase = createClient();

  const handleContentChange = (reason) => {
    setContent(reason);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && validTypes.includes(file.type)) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      toast.error("Please select a valid image file (PNG, JPG, JPEG)");
    }
  };

  async function uploadImage(file) {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("artikel")
        .upload(`artikel/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        toast.error("Image upload failed");
        return null;
      }

      if (data) {
        const { data: publicUrl, error: publicUrlError } = supabase.storage
          .from("artikel")
          .getPublicUrl(`artikel/${fileName}`);

        if (publicUrlError) {
          console.error(publicUrlError);
          toast.error("Failed to get image public URL");
          return null;
        }

        return publicUrl.publicUrl;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during image upload");
      return null;
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = artikel.gambar;

      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      const formattedTitle = judul.replace(/-/g, " ");
      const { data, error } = await supabase
        .from("artikel")
        .update({
          judul: formattedTitle,
          konten: content,
          gambar: imageUrl,
        })
        .eq("judul", artikel?.judul);

      if (error) {
        console.error(error);
        toast.error("Update failed");
      } else {
        toast.success("Berhasil Perbarui Artikel", { duration: 3000 });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  }
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 bg-gray-100 mb-24 sm:mb-0">
      <h3 className="text-lg font-semibold">Edit Artikel</h3>
      <div className="flex justify-center">
        <div className="max-w-2xl mt-6 py-6 bg-white p-4">
          <div className="flex flex-col gap-6">
            <div className="">
              <User
                name={
                  <p className="text-md font-medium flex justify-center items-center gap-1">
                    Apt. {artikel?.id_apoteker?.nama}{" "}
                    <BadgeCheck color="#0766AD" size={15} />
                  </p>
                }
                description={
                  <p className="text-md">
                    {artikel?.created_at &&
                    format(artikel?.created_at, "dd MMM yyyy ", { timeZone })
                    }
                  </p>
                }
                avatarProps={{
                  src: artikel?.id_apoteker?.picture,
                  size: "sm",
                }}
              />
            </div>
            <Input
              label="Judul Artikel"
              size="md"
              onChange={(e) => setJudul(e.target.value)}
              value={judul}
            />
            <article>
              <div className="mb-6">
                <div className="flex justify-center mb-2">
                  <Image
                    className="object-cover w-full h-full"
                    src={previewUrl}
                  />
                </div>
                <label className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  Ganti Gambar
                  <input
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                    id="dropzone-file"
                    type="file"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div>
                <Tiptap content={content} onChange={handleContentChange} />
              </div>
            </article>
          </div>
          <Button onClick={onOpen} className="mt-4"                       color="primary">
            Simpan
          </Button>
          <Modal
            hideCloseButton
            placement="center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Simpan Perubahan
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-lg">Apakah anda yakin?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" variant="flat" onPress={onClose}>
                      Batal
                    </Button>
                    <Button
                      isLoading={loading}
                      color="primary"
                      onClick={(e) => handleUpdate(e)}
                    >
                      Simpan
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
