"use client";
import { getUser } from "@/libs/actions";
import { getUserFromDatabase } from "@/services/getUserFromDatabase";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForumItem from "./forumItem";

export default function ForumKategori({checkUser}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(selectedValue);

  async function addNewForum(){
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("diskusi")
        .insert({judul: judul, kategori: selectedValue, penulis: user?.nama, deskripsi: deskripsi });
      if (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Gagal Membuat Diskusi Baru", {
          position: "top-center",
          autoClose: 2000,
        })
      } else {
        toast.success("Berhasil Membuat Diskusi Baru", {
          position: "top-center",
          autoClose: 1500,
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

  useEffect(() => {
    async function getUsers() {
      const role = await getUser();
      const usera = await getUserFromDatabase(role?.user_metadata?.role || 'pengguna');
      setUser(usera);
      console.log(usera?.nama);
    }  
    fetchKategori();
    getUsers();
    console.log(user)
  }, []);

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
          className="shadow-sm bg-[#EE0037] text-white"
        >
          Buat
        </Button>
      </div>

      <div className="hidden sm:block sm:w-2/6">
        <div className="sticky px-6 top-20 z-10 flex flex-col justify-start py-6 bg-white rounded-lg shadow-sm ">
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
            <Button startContent={<Pencil />} size="sm" onPress={() => { checkUser ? onOpen() : router.push('/login') }} color="danger">
              Buat
            </Button>
          </div>

          <RadioGroup className="mt-4">
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
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
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
                <Button isLoading={isLoading} color="danger" onPress={addNewForum}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col justify-start items-center gap-2 sm:w-4/6">
        <ForumItem searchQuery={searchQuery} searchByKategori={selectedValue} />
      </div>
      <ToastContainer />
    </>
  );
}
