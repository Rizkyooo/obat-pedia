"use client";
import { useState, useCallback, useMemo } from "react";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  User,
  useDisclosure,
} from "@nextui-org/react";
import parse from "html-react-parser";
import { DeleteIcon, EditIcon, BookCheck, Search, UserRoundPlus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AddUserModal from "./addUserModal";

const TablePengguna = ({role, columns, rows }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedArtikel, setselectedArtikel] = useState(null);
  const [status, setStatus] = useState(null);
  const [openModal, setOpenModal] = useState("");
  const [value, setValue] = useState(new Set(["apoteker"]))

  const supabase = createClient();
  console.log(role)

  const router = useRouter();

  async function deleteArtikel(name, e) {
    setLoading(true);
    e.preventDefault();
    if (!name) {
      return;
    }
    try {
      const { data, error } = await supabase
        .from(role)
        .delete()
        .eq("nama", name);

      if (error) {
        toast.error("gagal hapus pengguna");
        setLoading(false);
        console.log(error);
      }
      setLoading(false);
      toast.success("berhasil hapus pengguna");
      router.refresh();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((item) =>
      item.nama?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "nama":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.picture }}
            name={item.nama}
            description={item.email}
          />
        );
      case "aksi":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content={`Edit ${role}`}>
              <span
                onClick={() => {
                  router.push(`/admin/kelola-pengguna/edit/${role}-${item?.id}`);
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content={`Hapus ${role}`}>
              <span
                onClick={() => {
                  onOpen();
                  setOpenModal("delete");
                  setselectedArtikel(item?.nama);
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      case "jenis_kelamin":
        return <span>{item.jenis_kelamin || "-"}</span>;
      case "status_keanggotaan":
        return <span>{truncateText(item.status_keanggotaan  || "-", 20) || "-"}</span>;
        case "pengalaman":
          return <span>{truncateText(item.pengalaman || "-", 20) || "-"}</span>;
          case "riwayat_pendidikan":
        return <span>{truncateText(item.riwayat_pendidikan || "-", 20) || "-"}</span>;
        case "keahlian":
        return <span>{truncateText(item.keahlian  || "-", 20) || "-"}</span>;
      default:
        return cellValue;
    }
  }, []);
  const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + " ...";
  }
  return text;
};

  console.log(value)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start items-center gap-2">
        <Input
          className="bg-white rounded-full w-1/3"
          startContent={<Search opacity={0.5} size={20} />}
          type="search"
          placeholder={"cari nama..."}
          variant="bordered"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <AddUserModal role={role}/>
        {/* <Button onClick={onOpen} color="danger" startContent={<UserRoundPlus size={20} />}>Tambah {role}</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
      </div>

      <Table aria-label="table artikel" className=" max-w-4xl">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredRows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

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
                {openModal === "verifikasi"
                  ? "Verifikasi Artikel"
                  : "Hapus Pengguna"}
              </ModalHeader>
              <ModalBody>
                <p className="text-lg">
                  {openModal === "verifikasi"
                    ? `Verifikasi "${selectedArtikel}" ?`
                    : `Hapus "${selectedArtikel}" ?`}{" "}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Batal
                </Button>
                {openModal === "verifikasi" ? (
                  <Button
                    isLoading={loading}
                    color="danger"
                    onClick={(e) => verifyArtikel(selectedArtikel, e)}
                  >
                    {status === "published"
                      ? "Ubah Menjadi On Review"
                      : "Publish Artikel"}
                  </Button>
                ) : (
                  <Button
                    isLoading={loading}
                    color="danger"
                    onClick={(e) => deleteArtikel(selectedArtikel, e)}
                  >
                    Hapus {role}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TablePengguna;
