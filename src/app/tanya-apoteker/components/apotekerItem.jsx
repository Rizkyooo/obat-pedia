"use client";
import { getUser } from "@/libs/actions";
import {
  Accordion,
  AccordionItem,
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
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function ApotekerItem({ apoteker }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedApoteker, setSelectedApoteker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOpenModal = (apotekerItem) => {
    setSelectedApoteker(apotekerItem);
    onOpen();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStartChat = async () => {
    setIsLoading(true);
    const user = await getUser();
    if(!user){
      
      return (router.push('/login')&&setIsLoading(false));
    } else{
      return (router.push('/tanya-apoteker/chat/' + selectedApoteker?.id)&&      setIsLoading(false)
      )
    }
  }

  const filteredApoteker = apoteker.filter((apotekerItem) =>
    apotekerItem.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(apoteker);
  return (
    <div className="px-6">
      <Input
        variant="bordered"
        className="bg-white rounded-full"
        placeholder="cari apoteker"
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth={false}
      />
      <div className="bg-gray-100 mt-2 rounded-md p-2 grid sm:grid-cols-2 gap-2">
        {filteredApoteker?.map((apotekerItem) => (
          <div
            key={apotekerItem.id}
            className="bg-white shadow-sm rounded-md p-4 flex justify-between"
          >
            <div>
              <User
                avatarProps={{
                  src:
                    apotekerItem?.picture ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
                  size: "sm",
                }}
                name={apotekerItem?.nama}
                description={apotekerItem?.status_keanggotaan}
              />
              <div className="flex pl-10 gap-1 items-center">
                <p className="text-[0.65rem] opacity-55">Online</p>
                <div className="flex justify-center items-center bg-green-500 rounded-full h-2 w-2 animate-pulse">
                  {" "}
                </div>
              </div>
            </div>
            <Button
              onPress={() => handleOpenModal(apotekerItem)}
              color="danger"
              className="my-auto bg-[#EE0037]"
              size="sm"
            >
              Chat
            </Button>
          </div>
        ))}
      </div>
        {filteredApoteker.length === 0 && (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>Oppss Apoteker tidak ditemukan</p>
          </div>
        )}

      {selectedApoteker && (
        <Modal
        scrollBehavior="inside"
          className="bg-gray-50"
          isDismissable={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {`Apt. ${selectedApoteker.nama}`}
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center">
                      <Image className="h-40" src={selectedApoteker?.picture} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-sm flex flex-col gap-1">
                        <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
                          <p className="font-semibold">Nama Lengkap</p>
                          <p>Apt. {selectedApoteker?.nama}</p>
                        </div>
                      </div>
                      <div className="text-sm flex flex-col gap-1">
                        <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
                          <p className="font-semibold">Nomor STR</p>
                          <p>{selectedApoteker?.no_str}</p>
                        </div>
                      </div>
                      <div className="text-sm flex flex-col gap-1">
                        <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
                          <p className="font-semibold">Tempat Praktik</p>
                          <p>{selectedApoteker?.status_keanggotaan}</p>
                        </div>
                      </div>

                      <Accordion className=" shadow-sm px-2 bg-white rounded-md">
                        <AccordionItem
                          classNames={{
                            title: "font-semibold text-[0.9rem]",
                            content: "text-sm",
                          }}
                          key="1"
                          aria-label="Pengalaman"
                          title="Pengalaman"
                        >
                          <p>
                          {selectedApoteker?.pengalaman}
                          </p>
                        </AccordionItem>
                      </Accordion>

                      <Accordion className=" shadow-sm px-2 bg-white rounded-md">
                        <AccordionItem
                          classNames={{
                            title: "font-semibold text-sm",
                            content: "text-sm",
                          }}
                          key="1"
                          aria-label="Riwayat Pendidikan"
                          title="Riwayat Pendidikan"
                        >
                          <p>{selectedApoteker?.riwayat_pendidikan}</p>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button size={"sm"} variant="flat" onPress={onClose}>
                    Batal
                  </Button>
                  <Button isLoading={isLoading} onPress={handleStartChat} size={"sm"} color="danger" >
                    Mulai Konsultasi
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
