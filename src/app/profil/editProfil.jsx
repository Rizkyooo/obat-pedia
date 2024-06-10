"use client";
import { Input, RadioGroup, Radio, Button } from "@nextui-org/react";
import { getUserFromDatabase } from "@/services/getUserFromDatabase";
import { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,Image
  } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/libs/actions";
export default function EditProfil() {
  const [user, setUser] = useState(null);
  const [nama , setNama] = useState("");
  const [email , setEmail] = useState("");
  const [kelamin , setKelamin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = () => {
    if(user){
        console.log(user);
        updateUser(user?.id, nama, email, kelamin);
    }
  };
  async function updateUser(id,nama, email, jenis_kelamin) {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase
    .from('pengguna')
    .update({ nama: nama,
      email: email,
      jenis_kelamin: jenis_kelamin ,
    })
    .eq('id', id)

    if(error){
      console.log(error);
      setIsError(true);
      setIsLoading(false);
      onOpen();
    }

    onOpen();
    setIsLoading(false);
    setTimeout(() => {
        window.location.reload();
      }, 500);
      
  }
  
  useEffect(() => {
    async function getUsers() {
      const role = await getUser();
      const users = await getUserFromDatabase(role?.user_metadata?.role || 'pengguna');
      console.log(users);
      setUser(users);
      setNama(users?.nama);
      setEmail(users?.email);
      setKelamin(users?.jenis_kelamin);
      return users;
    }

    getUsers();
  }, []);
  return (
    <div className=" mt-4 ">
      <form className="grid gap-4 pb-6 " action="">
        <Input
          type="nama"
          label="Nama"
          variant="bordered"
          placeholder={user?.nama}
          defaultValue={nama}
          onChange={(value) => setNama(value.target.value)}
        />
        <Input
          type="email"
          label="Email"
          placeholder={user?.email}
          defaultValue={email}
          variant="bordered"
          onChange={(value) => setEmail(value.target.value)}
        />

        <RadioGroup label="Jenis Kelamin"
            defaultValue={kelamin}
            onValueChange={(value) => setKelamin(value)}
        >
          <Radio value='laki-laki'>Laki-laki</Radio>
          <Radio value='perempuan'>Perempuan</Radio>
        </RadioGroup>

        <Button
        isLoading={isLoading}
          onClick={() => {
            handleSubmit();
          }}
          className="mt-4"
          type="submit"
          variant="ghost"
          color="danger"
        >
          Update Profile
        </Button>
      </form>
      <Modal placement="center" size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody  className="my-9 flex justify-center items-center flex-col">
                {isError ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image width={100} src="./images/neutral.png" alt="error" />
                    <p className="text-sm">{"Oppps Terjadi Kesalahan"}</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                  <Image width={100} src="./images/happy-face.png" alt="error" />
                  <p>Berhasil Update Data</p>
                </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
       
      </Modal>
    </div>
  );
}
