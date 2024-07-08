
'use client'
import Link from "next/link";
import { Image, Input, Button, RadioGroup, Radio, Avatar } from "@nextui-org/react";
import { getUser, handleOauth } from "@/libs/actions";
import { signup } from "@/libs/actions";
import GoogleIcon from "@/components/googleIcon";
import {useSearchParams } from "next/navigation";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";


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


  const supabase = createClient();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    jenis_kelamin: "",
    status_keanggotaan: "",
    alamat: "",
    no_str: "",
    pengalaman: "",
    riwayat_pendidikan: "",
    no_sip: "",
    keahlian: "",
    picture: "",
  });
  const [previewUrl, setPreviewUrl] = useState("https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png");
  const [image, setImage] = useState(null);

  const handleChange = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && validTypes.includes(file.type)) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
      toast.error("Please select a valid image file (PNG, JPG, JPEG)");
    }
  };

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file?.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("artikel")
        .upload(`picture_apoteker/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        toast.error("Image upload failed");
        return null;
      }

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("artikel")
        .getPublicUrl(`picture_apoteker/${fileName}`);

      if (publicUrlError) {
        console.error(publicUrlError);
        toast.error("Failed to get image public URL");
        return null;
      }

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during image upload");
      return null;
    }
  };

  const addApoteker = async () => {
    setIsLoading(true);
    try {
      const picture = image ? await uploadImage(image) : userData.picture;

      const data = {
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: 'apoteker',
            jenis_kelamin: userData.jenis_kelamin,
            status_keanggotaan: userData.status_keanggotaan,
            alamat: userData.alamat,
            no_str: userData.no_str,
            pengalaman: userData.pengalaman,
            riwayat_pendidikan: userData.riwayat_pendidikan,
            no_sip: userData.no_sip,
            keahlian: userData.keahlian,
            picture,
          },
        }
      };

      const { error, data: user } = await supabase.auth.signUp(data);

      if (error) {
        setIsError(true);
        console.log(error);
        setIsLoading(false);

        return onOpen();
      }

      onOpen()
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
      setIsLoading(false);
      toast.error("An error occurred");
    }
  };



  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (name, email, password, e) => {
    e.preventDefault();
    setIsLoading(true);
    
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
          Daftar Apoteker
        </h3>
        <form className="flex gap-3 flex-col mt-6">
        <Input
        isRequired
        labelPlacement="outside"
              type="text"
              label="Nama"
              variant="bordered"
              placeholder="nama lengkap"
              onChange={handleChange("name")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="email"
              label="Email"
              placeholder="email"
              variant="bordered"
              onChange={handleChange("email")}
            />
            <RadioGroup
              label="Jenis Kelamin"
              onValueChange={(value) => setUserData({ ...userData, jenis_kelamin: value })}
            >
              <Radio value="laki-laki">Laki-laki</Radio>
              <Radio value="perempuan">Perempuan</Radio>
            </RadioGroup>
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Nomor STR"
              variant="bordered"
              placeholder="masukkan nomor STR"
              onChange={handleChange("no_str")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Nomor SIP"
              variant="bordered"
              placeholder="masukkan nomor SIP"
              onChange={handleChange("no_sip")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Tempat Praktek"
              variant="bordered"
              placeholder="masukkan tempat praktek"
              onChange={handleChange("status_keanggotaan")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Pengalaman"
              variant="bordered"
              placeholder="masukkan pengalaman anda"
              onChange={handleChange("pengalaman")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Riwayat Pendidikan"
              placeholder="masukkan riwayat pendidikan anda"
              variant="bordered"
              onChange={handleChange("riwayat_pendidikan")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Keahlian"
              variant="bordered"
              placeholder="masukkan keahlian anda"
              onChange={handleChange("keahlian")}
            />
            <Input
            isRequired
            labelPlacement="outside"
              type="text"
              label="Alamat"
              variant="bordered"
              placeholder="masukkan alamat anda"
              onChange={handleChange("alamat")}
            />
          <Input
          required
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
            onChange={handleChange("password")}
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
          <div className="flex flex-col justify-center items-center gap-2">
          <Avatar
          defaultValue={"https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"}
          isBordered={false}
          radius="full"
          className="w-32 h-42 sm:w-52"
          src={previewUrl}
        />
        <label className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          Foto Profil
          <input
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            id="dropzone-file"
            type="file"
            style={{ display: "none" }}
          />
        </label>
          </div>
          {/* <p className="text-sm mb-4">Sudah Punya Akun? <Link href={"/login"} className="text-[#EE0037]">Masuk</Link></p> */}
          <Button
          onPress={()=>{addApoteker()}}
          isDisabled={!userData?.alamat||!userData?.email||!userData?.keahlian||!userData?.name||!userData?.password||!userData?.status_keanggotaan||!userData?.no_str||!userData?.pengalaman||!userData?.riwayat_pendidikan||!userData?.no_sip||!userData?.jenis_kelamin}
          isLoading={isLoading}
          formAction=""
          type="submit"
            className="flex justify-center"
            color="danger"
            variant="ghost"
          >Daftar
          </Button>
        </form>
        
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

