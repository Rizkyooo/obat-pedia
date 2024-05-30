"use client";
import { login } from "@/libs/actions";
import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import GoogleIcon from "@/components/googleIcon";
import { loginWithGoogle } from "@/libs/actions";
import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
export default function LoginPage() {
  const message = useSearchParams().get("message");
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <section className="flex container mx-auto p-16 ">
      <div className="w-1/2 bg-[#EE0037] justify-center items-center rounded-tl-2xl hidden sm:flex">
        <Image width={300} alt="logins" src="./images/logins.png" />
      </div>
      <div className=" w-full sm:w-1/2 bg-slate-100 px-4 sm:px-16 py-14 rounded-xl">
        <h3 className="font-bold text-3xl text-[#EE0037] flex justify-center">
          Login
        </h3>
        <form action="" className="flex flex-col mt-6">
          <Input
            name="email"
            id="email"
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
          <p className="text-sm mb-4">
            Belum Punya Akun?{" "}
            <Link
              href="/signup"
              className="text-[#EE0037] font-bold cursor-pointer"
            >
              Daftar
            </Link>
          </p>

          <Button
            formAction={login}
            className="flex justify-center mb-4"
            color="danger"
            variant="ghost"
            type=""
            onClick={() =>{onOpen(); setIsLoading(true)}}
          >
            {isLoading ? <Spinner color="danger" size="sm" /> : "Masuk"}
          </Button>
          <hr className="bg-slate-600 mb-4 mx-2" />
          <Button
            onClick={() => loginWithGoogle()}
            startContent={<GoogleIcon />}
          >
            Login with google
          </Button>
        </form>

        {message==='error' &&  <Modal placement="center" isOpen={isOpen} onOpenChange={()=>{onOpenChange(); setIsLoading(false)}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="my-9 flex justify-center items-center flex-col">
              <Image width={100} src="./images/neutral.png" alt="error" />
                <p className="text-md">email atau password anda salah</p>
              </ModalBody>
          
            </>
          )}
        </ModalContent>
      </Modal>}
        

        

      </div>
    </section>
  );
}
