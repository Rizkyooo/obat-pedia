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
  User,
  useDisclosure,
} from "@nextui-org/react";
import parse from "html-react-parser";
import { DeleteIcon, EditIcon, BookCheck, Search } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { format } from "date-fns-tz";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((value, key) => {
    return value && value[key] !== undefined ? value[key] : null;
  }, obj);
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + " ...";
  }
  return text;
};

const ArtikelTable = ({ columns, rows }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedArtikel, setselectedArtikel] = useState(null);
  const [status, setStatus] = useState(null);
  const [openModal, setOpenModal] = useState("")

  const supabase = createClient();

  const router = useRouter();
  async function verifyArtikel(judul, e) {
    setLoading(true);
    e.preventDefault();
    if (!judul) {
      return;
    }
    try {
      const statusData = status === "on review" ? "published" : "on review";
      const { data, error } = await supabase
        .from("artikel")
        .update({ status: statusData })
        .eq("judul", judul);

      if (error) {
        toast.error("gagal ubah status artikel");
        setLoading(false);
        console.log(error);
      }
      setLoading(false);
      toast.success("berhasil ubah status artikel");
      router.refresh();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteArtikel(judul, e) {
    setLoading(true);
    e.preventDefault();
    if (!judul) {
      return;
    }
    try {
      const { data, error } = await supabase
        .from("artikel")
        .delete()
        .eq("judul", judul);

        if (error) {
            toast.error("gagal ubah status artikel");
            setLoading(false);
            console.log(error);
          }
          setLoading(false);
          toast.success("berhasil ubah status artikel");
          router.refresh();
          return data;    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((item) =>
      item.judul?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  const statusColorMap = {
    published: "success",
    "on review": "warning",
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = getNestedValue(item, columnKey);

    if (columnKey === "konten" || (columnKey === "judul" && cellValue)) {
      return parse(truncateText(cellValue, 20));
    }

    if (columnKey === "created_at" && cellValue) {
      return format(new Date(cellValue), "dd MMM yyyy", {
        timeZone: "Asia/Jakarta",
      });
    }

    switch (columnKey) {
      case "id_apoteker.nama":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.id_apoteker.picture }}
            name={item.id_apoteker.nama}
            description={item.id_apoteker.email} // Assuming there's an email field
          />
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item?.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "aksi":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="success" content="Verifikasi">
              <span
                onClick={() => {
                  onOpen();
                  setOpenModal("verifikasi")
                  setselectedArtikel(item?.judul);
                  setStatus(item?.status);
                }}
                className="text-lg text-green-600 cursor-pointer active:opacity-50"
              >
                <BookCheck />
              </span>
            </Tooltip>
            <Tooltip content="Edit artikel">
              <span
                onClick={()=>{router.push(`/admin/kelola-artikel/edit/${item?.slug}`)}}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete artikel">
              <span onClick={() => {
                  onOpen();
                  setOpenModal("delete")
                  setselectedArtikel(item?.judul);
                }} className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start items-center">
        <Input
          className="bg-white rounded-full w-1/3"
          startContent={<Search opacity={0.5} size={20} />}
          type="search"
          placeholder="Cari judul artikel..."
          variant="bordered"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <Table aria-label="table artikel">
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
                {openModal==="verifikasi"? "Verifikasi Artikel": "Hapus Artikel"}
              </ModalHeader>
              <ModalBody>
                <p className="text-lg">{openModal==="verifikasi" ? `Verifikasi "${selectedArtikel}" ?`: `Hapus "${selectedArtikel}" ?`} </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Batal
                </Button>
                {openModal==="verifikasi"? (

                <Button
                  isLoading={loading}
                  color="danger"
                  onClick={(e) => verifyArtikel(selectedArtikel, e)}
                >
                  {status === "published"
                    ? "Ubah Menjadi On Review"
                    : "Publish Artikel"}
                </Button>
                ): (
                    <Button
                  isLoading={loading}
                  color="danger"
                  onClick={(e) => deleteArtikel(selectedArtikel, e)}
                >
                  Hapus Artikel
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

export default ArtikelTable;
