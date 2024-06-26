"use client";
import {
  Button,
  CardBody,
  Chip,
  Image,
  Input,
  Slider,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
} from "@nextui-org/react";
import Link from "next/link";
import parse from "html-react-parser";
import { HeartIcon, PauseCircleIcon, PencilIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
export default function Artikel({ artikels }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + " ...";
    }
    return text;
  };

  const filteredArtikels = artikels?.filter((artikel) =>
    artikel.judul?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const router = useRouter();

  const supabase = createClient();
  async function handleDelete(artikel) {
    setLoading(true);
    try {
      const formattedTitle = artikel?.replace(/-/g, " ");
      const { data, error } = await supabase
        .from("artikel")
        .delete()
        .eq("judul", formattedTitle);
      if (error) {
        console.error(error);
        toast.error("Gagal hapus artikel");
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Berhasil hapus artikel", { duration: 3000 });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  }

  const [selectedArtikel, setSelectedArtikel] = useState(null);

  function pickedDeleteArtikel(artikel){
    setSelectedArtikel(artikel)
    onOpen();
  }

  return (
    <>
      <div className="flex gap-1 justify-center">
        <Input
          value={searchQuery}
          className="bg-white rounded-full sm:w-3/4"
          variant="bordered"
          placeholder="cari artikel"
          type="search"
          onValueChange={setSearchQuery}
        />
        <Link href="/apoteker/buat-artikel/create">
          <Button color="danger" startContent={<PencilIcon size={13} />}>
            Tulis Artikel
          </Button>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="container mx-auto mt-6 sm:px-14 flex flex-col gap-2">
          {filteredArtikels?.map((artikel) => (
            <Card className="h-42" isBlurred shadow="sm">
              <CardBody>
                <div className="flex gap-4 h-full ">
                  <div className="h-full flex justify-center items-center">
                    <Image
                      className=" h-40 w-48 object-cover"
                      alt="Album cover"
                      height={"100%"}
                      width={"100%"}
                      shadow="md"
                      src={artikel?.gambar}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 justify-center ">
                    <div className="flex justify-between">
                      <Chip color="primary" size="sm">
                        {artikel?.id_kategori?.nama}
                      </Chip>
                    </div>
                    <h2 className="text-md font-semibold">
                      {truncateText(artikel?.judul, 60)}
                    </h2>
                    <div className="hidden sm:block">
                      {parse(truncateText(artikel?.konten, 130))}
                    </div>
                    <div className="flex gap-1 sm:gap-4 items-center">
                      <Button
                        onClick={() => {
                          router.push(
                            `/apoteker/buat-artikel/edit/${artikel?.judul.replace(
                              / /g,
                              "-"
                            )}`
                          );
                        }}
                        color="default"
                        size="sm"
                        startContent={<PencilIcon size={13} />}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        startContent={<Trash2 size={13} />}
                        onClick={() => pickedDeleteArtikel(artikel?.judul)}
                      >
                        Hapus
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
                                <Button
                                  color="default"
                                  variant="flat"
                                  onPress={onClose}
                                >
                                  Batal
                                </Button>
                                <Button
                                  isLoading={loading}
                                  color="danger"
                                  onClick={() => handleDelete(selectedArtikel)}
                                >
                                  Hapus Artikel
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                        {artikel?.status ==="on review" ? (
                          <Chip color="warning" size="sm">{artikel?.status}</Chip>
                        ): (
                          <Chip className="text-white" color="success" size="sm">{artikel?.status}</Chip>
                        )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
