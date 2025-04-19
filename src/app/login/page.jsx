"use client";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import GoogleIcon from "@/components/googleIcon";
import { loginWithGoogle } from "@/libs/actions";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { getUser } from "@/libs/actions";
// import { checkRole } from "@/services/checkRole";
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(true);
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (email, password, e) => {
    e.preventDefault();
    setIsLoading(true);
    const supabase = createClient();
    const data = {
      email: email,
      password: password,
    };
    const { error, data: user } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.message);
      onOpen();
    }

    if (user) {
      setUser(user);
      console.log(user);
      setIsLoading(false);
      onOpen();
      setRedirectMessage("Tunggu Sebentar...");
      checkRole(user.user.user_metadata?.role);
    }
  };

  const [redirectMessage, setRedirectMessage] = useState("");
  const checkRole = async (role) => {
    // const user = await getUser();
    // const role = user?.user_metadata?.role;
    console.log(role);
    if (role === "pengguna") {
      router.push("/");
    } else if (role === "apoteker") {
      router.push("/apoteker/obat-a-z");
    } else if (role === "admin") {
      router.push("/admin");
    } else{
      router.push("/")
    }
  };

  return (
    <section className="flex container mx-auto p-16 ">
      <div className="w-1/2 bg-blue-500 justify-center items-center rounded-tl-2xl hidden sm:flex">
        <Image width={300} alt="logins" src="./images/logins.png" />
      </div>
      <div className=" w-full sm:w-1/2 bg-slate-100 px-4 sm:px-16 py-14 rounded-xl">
        <h3 className="font-bold text-3xl text-[#EE0037] flex justify-center">
          Login
        </h3>
        <form action="" className="flex flex-col mt-6">
          <Input
            isRequired
            name="email"
            id="email"
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
            value={password}
            variant="bordered"
            placeholder="masukkan password anda"
            labelPlacement="outside"
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
            isLoading={isLoading}
            isDisabled={!email || !password}
            // formAction={() => handleSubmit(email, password)}
            className="flex justify-center mb-4"
                                  color="primary"
            variant="ghost"
            type="submit"
            onClick={(e) => handleSubmit(email, password, e)}
          >
            Masuk
          </Button>
          <hr className="bg-slate-600 mb-4 mx-2" />
          <Button
            isLoading={isLoadingGoogle}
            onClick={() => {
              setIsLoadingGoogle(true);
              loginWithGoogle();
            }}
            startContent={isLoadingGoogle ? "" : <GoogleIcon />}
          >
            Login with google
          </Button>
        </form>

        <Modal placement="center" size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody  className="my-9 flex justify-center items-center flex-col">
                {user?.user===null ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image width={100} src="./images/neutral.png" alt="error" />
                    <p className="text-sm">{message}</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                  <Image className="animate-bounce" width={100} src="./images/happy-face.png" alt="error" />
                  <p>login berhasil</p>
                  <p className="text-xs">{redirectMessage}</p>
                </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
       
      </Modal>
      </div>
    </section>
  );
}
