"use client";
import { createClient } from "@/utils/supabase/client";
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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function ApotekerItem({ apoteker, user }) {
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

  const handleStartChat = () => {
    setIsLoading(true);
    if (!user) {
      router.push("/login");
      setIsLoading(false);
    } else {
      router.push("/tanya-apoteker/chat/" + selectedApoteker?.id);
      setIsLoading(false);
    }
  };

  const filteredApoteker = apoteker.filter((apotekerItem) =>
    apotekerItem.nama.toLowerCase().includes(searchQuery.toLowerCase()) &&
    apotekerItem.is_online === true
  );

  return (
    <div className="px-6">
      <Input
        color="primary"
        className="bg-white rounded-full"
        placeholder="cari apoteker"
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth={false}
      />
      <div className="bg-[#f6f8fd]">
        <div className="mt-2 rounded-md p-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredApoteker?.map((apotekerItem) => (
            <div
              key={apotekerItem.id}
              className="bg-white rounded-2xl p-4 flex flex-col min-h-[320px]"
            >
              <div className="flex flex-col items-center flex-1 md:mb-4">
                <div className="mb-3 w-28 h-28 rounded-full overflow-hidden border-4 border-purple-300">
                  <img
                    src={apotekerItem?.picture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                    alt={apotekerItem?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="font-semibold text-gray-800 text-center text-xs md:text-medium">{apotekerItem?.nama}</h3>
                <p className="text-blue-500 text-center my-2 text-xs md:text-sm">{apotekerItem?.keahlian}</p>
                <p className="text-gray-500 text-center text-xs md:text-md">{apotekerItem?.status_keanggotaan}</p>
              </div>
                
              <Button
                onPress={() => handleOpenModal(apotekerItem)}
                color="primary"
                className="mt-auto bg-blue-500 w-full rounded-full"
                size="sm"
              >
                Chat sekarang
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
                    {`${selectedApoteker.nama}`}
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-center items-center">
                        <Image
                          className="h-40"
                          src={selectedApoteker?.picture}
                        />
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
                            <p className="font-semibold">Nomor SIP</p>
                            <p>{selectedApoteker?.no_sip}</p>
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
                            <p>{selectedApoteker?.pengalaman}</p>
                          </AccordionItem>
                        </Accordion>

                        <Accordion className=" shadow-sm px-2 bg-white rounded-md">
                          <AccordionItem
                            classNames={{
                              title: "font-semibold text-[0.9rem]",
                              content: "text-sm",
                            }}
                            key="1"
                            aria-label="Keahlian"
                            title="Keahlian"
                          >
                            <p>{selectedApoteker?.keahlian}</p>
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
                    <Button
                      isLoading={isLoading}
                      onPress={handleStartChat}
                      size={"sm"}
                      color="primary"
                    >
                      Mulai Konsultasi
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
}
