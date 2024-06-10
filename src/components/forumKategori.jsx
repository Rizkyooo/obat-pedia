'use client'
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
  DropdownTrigger
} from "@nextui-org/react";
import { ListFilter, Pencil } from "lucide-react";
import { useMemo, useState } from "react";

export default function ForumKategori() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex justify-start items-center gap-2 sm:hidden mb-6 ">
      <Input
      className="bg-white rounded-xl"
          // value={''}
          // onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
          placeholder="Cari Diskusi"
          type="search"
          variant="bordered"
          fullWidth = {true}
        />
         <Dropdown>
      <DropdownTrigger>
        <button><ListFilter className="text-[#EE0037]"/></button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        <Button
          startContent={<Pencil />}
          onPress={onOpen}
          size="sm"
          className="shadow-sm bg-[#EE0037] text-white"
        >
          Buat
        </Button>
      </div>

      <div className="hidden sm:block sm:w-2/6">
        <div className="sticky px-6 top-20 z-10 flex flex-col justify-start py-6 bg-white rounded-lg shadow-sm ">
          <Button onPress={onOpen} fullWidth color="danger">
            Buat Diskusi Baru
          </Button>
          <RadioGroup className="mt-4">
            <Radio value="buenos-aires">Obat</Radio>
            <Radio value="sydney">Kesehatan</Radio>
            <Radio value="san-francisco">Flu</Radio>
            <Radio value="london">Mag</Radio>
            <Radio value="tokyo">Diare</Radio>
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
                />
                <Textarea
                  fullWidth
                  variant="bordered"
                  isRequired={true}
                  label="Deskripsi"
                  labelPlacement="outside"
                  placeholder="Isi Deskripsi"
                />
                <Select
                  className="shadow-xs"
                  size="md"
                  radius="md"
                  color={"#EE0037"}
                  variant="bordered"
                  placeholder="Pilih Topik"
                  labelPlacement="outside"
                >
                  <SelectItem>Obat</SelectItem>
                  <SelectItem>Kesehatan</SelectItem>
                  <SelectItem>Kesehatan</SelectItem>
                  <SelectItem>Kesehatan</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
