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
  Textarea
} from "@nextui-org/react";

export default function ForumKategori() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex justify-center items-center gap-2 sm:hidden mb-6">
        <Select
          className="shadow-xs"
          size="xs"
          radius="md"
          color={"#EE0037"}
          variant="bordered"
          labelPlacement="outside"
          placeholder="Kategori"
        >
          <SelectItem>Obat</SelectItem>
          <SelectItem>Kesehatan</SelectItem>
        </Select>
        <Button
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
