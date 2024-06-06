
'use client'
import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import { getUser, handleOauth } from "@/libs/actions";
import { signup } from "@/libs/actions";
import GoogleIcon from "@/components/googleIcon";
import {useSearchParams } from "next/navigation";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";
import { createClient } from "@/utils/supabase/client";


export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (name, email, password, e) => {
    e.preventDefault();
    setIsLoading(true);
    const supabase = createClient();
    const data = {
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          role: 'pengguna', 
        },
      }
    }
    const { error, data: user } = await supabase.auth.signUp(data)
    if (error) {
      setIsError(true);
      setMessage(error.message);
      onOpen();
      console.log(error);
    }
    if(user) {
      onOpen();
      console.log(user);
      // router.push("/login");
      setIsLoading(false);
    }
  };

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
        isRequired
            className="mb-4"
            id="name"
            name="name"
            type="name"
            label="Nama"
            size="md"
            variant="bordered"
            placeholder="masukkan nama anda"
            labelPlacement="outside"
            value={name}
            onChange={handleNameChange}
          />
          <Input
          isRequired
          id="email"
          name="email"
            className="mb-4"
            type="email"
            label="Email"
            size="md"
            variant="bordered"
            placeholder="masukkan email anda"
            labelPlacement="outside"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
          isRequired
          name="password"
          id="password"
            className="mb-2"
            type={showPassword ? "text" : "password"}
            label="Password"
            size="md"
            variant="bordered"
            placeholder="masukkan password anda"
            labelPlacement="outside"
            value={password}
            onChange={handlePasswordChange}
            endContent={
              <div
                className="cursor-pointer"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            }
          />
          <p className="text-sm mb-4">Sudah Punya Akun? <Link href={"/login"} className="text-[#EE0037]">Masuk</Link></p>
          <Button
          isDisabled={!name || !email || !password}
          isLoading={isLoading}
          formAction=""
          type="submit"
            className="flex justify-center"
            color="danger"
            variant="ghost"
            onClick={(e) => handleSubmit(name, email, password, e)}
          >Daftar
          </Button>
        </form>
        <hr className="bg-slate-600 my-4 mx-auto flex justify-center items-center w-full"/>  
          <Button isLoading={isLoadingGoogle} className="w-full" onClick={()=>{setIsLoadingGoogle(true);handleOauth()}} startContent={<GoogleIcon/>}>SignUp with google</Button>
      </div>


      <Modal placement="center" size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody  className="my-9 flex justify-center items-center flex-col">
                {isError ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image width={100} src="./images/neutral.png" alt="error" />
                    <p className="text-sm">{message}</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                  <Image width={100} src="./images/happy-face.png" alt="error" />
                  <p>Selamat Akun Anda Telah Terdaftar</p>
                  <Button size="xs" color="danger" className="mt-4" onClick={() => router.push("/login")}>Login</Button>
                </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
       
      </Modal>
    </section>
  );
}

