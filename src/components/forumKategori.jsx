"use client";
import { getUser } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
  Textarea,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
} from "@nextui-org/react";
import { ListFilter, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ForumItem from "./forumItem";
import toast, { Toaster } from 'react-hot-toast';
import { revalidatePath } from "next/cache";

export default function ForumKategori({checkUser}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [selectedInsertKeys, setSelectedInsertKeys] = useState(new Set([""]));
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const selectedInsertValue = useMemo(
    () => Array.from(selectedInsertKeys).join(", ").replaceAll("_", " "),
    [selectedInsertKeys]
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(selectedValue);

  async function addNewForum(){
    setIsLoading(true);
    const user =  await getUser()
    const role = user?.user_metadata?.role || 'pengguna'
    const userIdField = role === 'apoteker' ? 'id_apoteker' : 'id_pengguna';
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("diskusi")
        .insert({judul: judul, kategori: selectedInsertValue, deskripsi: deskripsi , [userIdField]: user?.id},);
      if (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Gagal Membuat Diskusi Baru", {
          position: "top-center",
          duration: 2000,
        })
      } else {
        toast.success("Berhasil Membuat Diskusi Baru", {
          position: "top-center",
          duration: 1500,
        })
        setIsLoading(false);
        onOpenChange(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchKategori() {
    const supabase = createClient();
    try {
      let { data: kategori_diskusi, error } = await supabase
        .from("kategori_diskusi")
        .select("id, nama");

      if (error) {
        console.log(error);
      }

      if (kategori_diskusi) {
        console.log(kategori_diskusi);
        setKategori(kategori_diskusi);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [forum, setForum] = useState([]);
  const [loadMore, setLoadMore] = useState(14);
  
  async function fetchForum(
    limit,
    searchQuery = "",
    searchByKategori = "",
    radioKategori = ""
  ) {
    setIsLoading(true);
    const user = await getUser();
    const role = user?.user_metadata?.role || "pengguna";
    const userIdField = role === "apoteker" ? "id_apoteker" : "id_pengguna";
    const supabase = createClient();
    try {
      let supabaseQuery = supabase
        .from("diskusi")
        .select(
          `id, created_at, judul, deskripsi, penulis, kategori, jml_komentar,id_pengguna(picture, nama, role) , id_apoteker(picture, nama, role)`
        )
        .order("created_at", { ascending: false })
        .range(0, limit);

      if (searchQuery) {
        supabaseQuery = supabaseQuery.ilike("judul", `%${searchQuery}%`);
      }

      if (searchByKategori) {
        supabaseQuery = supabaseQuery.ilike(
          "kategori",
          `%${searchByKategori}%`
        );
      }
      if (radioKategori) {
        supabaseQuery = supabaseQuery.ilike("kategori", `%${radioKategori}%`);
      }

      let { data, error } = await supabaseQuery;

      if (error) {
        console.error(error);
      }

      if (data) {
        console.log(data);
        setForum(data);
        setIsLoading(false);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleMore = () => {
    setLoadMore(loadMore + 14);
    fetchForum(loadMore + 14, searchQuery, selectedValue, selected);
  };

  useEffect(() => {  
    fetchKategori();
    fetchForum(loadMore, searchQuery, selectedValue, selected);
  }, [loadMore, searchQuery, selectedValue, selected]);

  return (
    <>
      <div className="flex justify-start items-center gap-2 sm:hidden mb-6 ">
        <Input
          className="bg-white rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
          placeholder="Cari Diskusi"
          type="search"
          variant="bordered"
          fullWidth={true}
        />
        <Dropdown>
          <DropdownTrigger>
            <button>
              <ListFilter className="text-[#EE0037]" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            {kategori.length > 0 && kategori.map((item) => (
              <DropdownItem key={item.nama}>{item.nama}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          startContent={<Pencil />}
          onPress={() => { checkUser ? onOpen() : router.push('/login') }}
          size="sm"
          className="shadow-sm bg-blue-500 text-white"
        >
          Buat
        </Button>
      </div>

      <div className="hidden sm:block sm:w-2/6">
        <div className="sticky px-6 top-10 z-10 flex flex-col justify-start py-6 bg-white rounded-lg shadow-sm ">
          <div className="flex gap-2">
            <Input
              className="bg-white rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="sm"
              placeholder="Cari Diskusi"
              type="search"
              variant="bordered"
              fullWidth={true}
            />
            <Button startContent={<Pencil />} size="sm" onPress={() => { checkUser ? onOpen() : router.push('/login') }}                       color="primary">
              Buat
            </Button>
          </div>

          <RadioGroup value={selected} onValueChange={setSelected} className="mt-4">
            {kategori.length > 0 && kategori.map((item) => (
              <Radio key={item.id} value={item.nama}>{item.nama}</Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Buat Diskusi Baru
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Judul"
                  labelPlacement="outside"
                  autoFocus
                  placeholder="Tambahkan Judul"
                  variant="bordered"
                  onChange={(e) => setJudul(e.target.value)}
                />
                <Textarea
                  fullWidth
                  variant="bordered"
                  isRequired={true}
                  label="Deskripsi"
                  labelPlacement="outside"
                  placeholder="Isi Deskripsi"
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
                <Select
                  className="shadow-xs"
                  size="md"
                  radius="md"
                  color={"#EE0037"}
                  variant="bordered"
                  label="Pilih Topik"
                  selectionMode="single"
                  selectedKeys={selectedInsertKeys}
                  onSelectionChange={setSelectedInsertKeys}
                  placeholder="Pilih Topik"
                >
                  {kategori.length > 0 && (
                    kategori.map((item) => (
                      <SelectItem key={item.nama}>{item.nama}</SelectItem>
                    ))
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button isLoading={isLoading}                       color="primary" onPress={addNewForum}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col justify-start items-center gap-2 sm:w-4/6">
        <ForumItem handleMore={handleMore} isLoading={isLoading} forum={forum} />
      </div>
      {/* <Toaster/> */}
    </>
  );
}
