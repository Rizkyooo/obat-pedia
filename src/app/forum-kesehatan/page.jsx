
'use client'
import { CirclePlus, PlusIcon } from "lucide-react";
import {Modal, Tooltip, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";


export default function Forum(){
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold">Forum Kesehatan</h3>
          <div>
            <Tooltip content="Buat Forum" placement="left-start" color="danger">
              <PlusIcon
                className="fixed bottom-24 right-8  bg-slate-50 justify-center items-center flex rounded-full hover:animate-spin  border-2 border-[#EE0037] hover:transition-all transition-all cursor-pointer"
                color="#EE0037" size={35}
              ></PlusIcon>
            </Tooltip>
          </div>
        </div>
      </main>
    );
}





export function ModalAddForum(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return(
        <>
        <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
      isDismissable={false}
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus

                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input

                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
    )
}