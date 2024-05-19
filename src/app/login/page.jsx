'use client'
import { login } from "../(auth)/actions";
import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import { userStore } from "@/store/user"; 
import GoogleIcon from "@/components/googleIcon";
import { handleOauth } from "../../libs/actions";
export default function LoginPage() {
  const { getUser} = userStore()
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
          <p className="text-sm mb-4">Belum Punya  Akun? <Link href={"/signup"} className="text-[#EE0037]">Daftar</Link></p>
          <Button
            onClick={getUser}
            formAction={login}
            className="flex justify-center mb-4"
            color="danger"
            variant="ghost"
            type=""
          >Masuk
          </Button>
          <Button onClick={()=>handleOauth()}  startContent={<GoogleIcon/>}>Login with  google</Button>
        </form>
      </div>
    </section>
  );
}

         
