
import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import { handleOauth } from "@/libs/actions";
import { signup } from "@/libs/actions";
import GoogleIcon from "@/components/googleIcon";
export default function SignupPage() {
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
          >Daftar
          </Button>
        </form>
        <hr className="bg-slate-600 my-4 mx-auto flex justify-center items-center w-full"/>  
          <Button className="w-full" formAction={handleOauth} startContent={<GoogleIcon/>}>SignUp with google</Button>
      </div>
    </section>
  );
}

