"use client";
import {
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
import { useState } from "react";

export default function ApotekerItem({ apoteker }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedApoteker, setSelectedApoteker] = useState(null);

  const handleOpenModal = (apotekerItem) => {
    setSelectedApoteker(apotekerItem);
    onOpen();
  };

  console.log(apoteker);
  return (
    <div className="px-6">
      <Input
        variant="bordered"
        className="bg-white rounded-full"
        placeholder="cari apoteker"
        type="search"
      />
      <div className="bg-gray-100 mt-2 rounded-md p-2 grid sm:grid-cols-2 gap-2">
        {apoteker?.map((apotekerItem) => (
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

      {selectedApoteker && (
        <Modal
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
                        <p>{selectedApoteker?.nama}</p>
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
                    <div className="text-sm flex flex-col gap-1">
                      <div className="shadow-sm min-w-full p-2 rounded-md bg-white flex flex-col justify-start items-start">
                        <p className="font-semibold">Riwayat Pendidikan</p>
                        <p>{selectedApoteker?.status_keanggotaan}</p>
                      </div>
                    </div>
                    </div>

                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button size={"sm"} variant="flat" onPress={onClose}>
                    Batal
                  </Button>
                  <Button size={"sm"} color="danger" onPress={""}>
                    Chat Sekarang
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
