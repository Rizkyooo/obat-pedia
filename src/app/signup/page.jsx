
'use client'
import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import { handleOauth } from "@/libs/actions";
import { signup } from "@/libs/actions";
import GoogleIcon from "@/components/googleIcon";
import {useSearchParams } from "next/navigation";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useEffect } from "react";

export default function SignupPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const message = useSearchParams().get('message')
  useEffect(() => {
    if (message==="error") {
      onOpen(true);
    }
  }, [message, onOpen]);
  console.log(message)
  return (
    <section className="flex container mx-auto p-16 ">
      <div className="w-1/2 bg-[#EE0037] justify-center items-center rounded-tl-2xl hidden sm:flex">
        <Image width={300} alt="logins" src="./images/logins.png" />
      </div>
      <div className=" w-full sm:w-1/2 bg-slate-100 px-4 sm:px-16 py-14 rounded-xl">
        <h3 className="font-bold text-3xl text-[#EE0037] flex justify-center">
          Daftar
        </h3>
        <form className="flex flex-col mt-6">
        <Input
            className="mb-4"
            id="name"
            name="name"
            type="name"
            label="Nama"
            size="md"
            variant="bordered"
            placeholder="masukkan nama anda"
            labelPlacement="outside"
          />
          <Input
          id="email"
          name="email"
            className="mb-4"
            type="email"
            label="Email"
            size="md"
            variant="bordered"
            placeholder="masukkan email anda"
            labelPlacement="outside"
          />
          <Input
          name="password"
          id="password"
            className="mb-2"
            type="password"
            label="Password"
            size="md"
            variant="bordered"
            placeholder="masukkan password anda"
            labelPlacement="outside"
          />
          <p className="text-sm mb-4">Sudah Punya Akun? <Link href={"/login"} className="text-[#EE0037]">Masuk</Link></p>
          <Button
          formAction={signup}
          type=""
            className="flex justify-center"
            color="danger"
            variant="ghost"
            onClick={() => onOpen(true)}
          >Daftar
          </Button>
        </form>
        <hr className="bg-slate-600 my-4 mx-auto flex justify-center items-center w-full"/>  
          <Button className="w-full" onClick={()=>handleOauth()} startContent={<GoogleIcon/>}>SignUp with google</Button>
      </div>

      <Modal placement="center" size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        {message==="error" ?  <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="my-9 flex justify-center items-center flex-col">
                <Image width={100} src="./images/neutral.png" alt="error" />
                <p>Ooppss Terjadi Kesalahan, Silahkan Coba Kembali</p>
              </ModalBody>
            </>
          )}
        </ModalContent> :  <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="my-9 flex justify-center items-center flex-col">
                <Image width={100} src="./images/happy-face.png" alt="error" />
                <p className="text-md">Selamat Anda Berhasil Mendaftar</p>
                <p className=" items-center text-sm md:md font-semibold">Silahkan Cek Email Anda Untuk Melakukan Verifikasi</p>
              </ModalBody>
            </>
          )}
        </ModalContent>}
       
      </Modal>
    </section>
  );
}

