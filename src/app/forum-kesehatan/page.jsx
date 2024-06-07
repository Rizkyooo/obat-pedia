
'use client'
import {Modal, Select, SelectItem, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, Input, RadioGroup, Radio} from "@nextui-org/react";
import ForumItem from "@/components/forumItem";


export default function Forum(){
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
      <main className="min-h-screen bg-gray-100 mx-auto sm:px-6 sm:relative">
        <h3 className="text-lg font-semibold p-4">Forum Kesehatan</h3>
        <div className="px-4 sm:flex sm:gap-4">
          <div className="flex justify-center items-center gap-2 sm:hidden mb-6">
            <Select
              className="shadow-xs"
              size="sm"
              radius="md"
              color={"#EE0037"}
              variant="bordered"
              label="Topik"
            >
              <SelectItem>Obat</SelectItem>
              <SelectItem>Kesehatan</SelectItem>
            </Select>
            <Button onPress={onOpen} className="shadow-sm" color="danger">
              Buat
            </Button>
          </div>

          <div className="hidden sm:block sm:w-2/6">
            <div className="sticky top-20 z-10 flex flex-col justify-start px-6 py-6 bg-white rounded-lg shadow-sm ">
              <Button onPress={onOpen} fullWidth color="danger">
                Buat Diskusi Baru
              </Button>
              <RadioGroup className="mt-4">
                <Radio value="buenos-aires">Buenos Aires</Radio>
                <Radio value="sydney">Sydney</Radio>
                <Radio value="san-francisco">San Francisco</Radio>
                <Radio value="london">London</Radio>
                <Radio value="tokyo">Tokyo</Radio>
              </RadioGroup>
            </div>
          </div>

          <div className="pl-1 flex flex-col justify-center items-center gap-2 sm:w-4/6">
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <Button size="sm" className="mt-4" color="danger" variant="ghost">
              Load More
            </Button>
          </div>
        </div>
        <ModalAddForum
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </main>
    );
}





export function ModalAddForum({isOpen, onOpenChange, onOpen}){
    return(
        <>
      <Modal 
      isDismissable={false}
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Buat Diskusi Baru</ModalHeader>
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
                <Select className="shadow-xs"
             size="md" radius="md" color={"#EE0037"} variant="bordered" placeholder="Pilih Topik" labelPlacement="outside">
                <SelectItem>
                    Obat
                </SelectItem>
                <SelectItem>
                    Kesehatan
                </SelectItem>
                <SelectItem>
                    Kesehatan
                </SelectItem>
                <SelectItem>
                    Kesehatan
                </SelectItem>
            </Select>
              </ModalBody>
              <ModalFooter>
                <Button  variant="flat" onPress={onClose}>
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
    )
}