
'use client'
import {Modal, Select, SelectItem, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import ForumItem from "@/components/forumItem";


export default function Forum(){
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold pl-1">Forum Kesehatan</h3>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Select
             size="sm" radius="md" color={"#EE0037"} variant="bordered" label="Topik">
                <SelectItem>
                    Obat
                </SelectItem>
                <SelectItem>
                    Kesehatan
                </SelectItem>
            </Select>
            <Button color='danger'>Buat</Button>
          </div>

          <div className="pl-1 flex flex-col justify-center items-start mt-6 gap-2">
            <ForumItem/>
            <ForumItem/>
            <ForumItem/>
            <ForumItem/>
            <ForumItem/>

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