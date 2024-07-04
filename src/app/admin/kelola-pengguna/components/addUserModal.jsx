"use client";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import {
  Input,
  RadioGroup,
  Radio,
  Button,
  Avatar,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";

export default function AddUserModal({ role }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const [penggunaData, setPenggunaData] = useState({
    email: "",
    password: "",
    name: "",
    jenis_kelamin: "",
    picture: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handlePenggunaChange = (field) => (e) => {
    setPenggunaData({ ...penggunaData, [field]: e.target.value });
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

  const supabase = createClient();

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file?.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("artikel")
        .upload(`picture_${role}/${fileName}`, file, {
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
        .getPublicUrl(`picture_${role}/${fileName}`);

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
        console.log(error);
        setIsLoading(false);
        return toast.error("Tidak dapat tambah pengguna");
      }

      toast.success("Berhasil menambah pengguna");
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An error occurred");
    }
  };

  const addPengguna = async () => {
    setIsLoading(true);
    try {
      const picture = image ? await uploadImage(image) : penggunaData.picture;

      const data = {
        email: penggunaData.email,
        password: penggunaData.password,
        options: {
          data: {
            name: penggunaData.name,
            role: 'pengguna',
            jenis_kelamin: penggunaData.jenis_kelamin,
            picture,
          },
        }
      };

      const { error, data: user } = await supabase.auth.signUp(data);

      if (error) {
        console.log(error);
        setIsLoading(false);
        return toast.error("Tidak dapat tambah pengguna");
      }

      toast.success("Berhasil menambah pengguna");
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An error occurred");
    }
  };

  console.log(userData)
  console.log(penggunaData)

  return (
    <div>
      <Button onClick={onOpen} color="danger" startContent={<UserRoundPlus size={20} />}>
        Tambah {role}
      </Button>
      <Modal
        placement="center"
        isDismissable={false}
        scrollBehavior="inside"
        backdrop="blur"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tambah {role}</ModalHeader>
              <ModalBody>
                {role === 'apoteker' ? (
                  <AddApoteker
                    userData={userData}
                    setUserData={setUserData}
                    previewUrl={previewUrl}
                    handleFileChange={handleFileChange}
                    handleChange={handleChange}
                  />
                ) : (
                  <AddPengguna 
                  penggunaData={penggunaData}
                    setPenggunaData={setPenggunaData}
                    previewUrl={previewUrl}
                    handleFileChange={handleFileChange}
                    handleChange={handlePenggunaChange}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" onPress={() => { role==='apoteker'? addApoteker(): addPengguna()}} isLoading={isLoading} disabled={isLoading}>
                  {isLoading ? "Menambah..." : `Tambah ${role}`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export function AddApoteker({ userData, setUserData, previewUrl, handleFileChange, handleChange }) {
  return (
    <div className="flex flex-col px-4 py-4 gap-4">
      <div className="bg-white flex flex-col justify-start items-center py-6 gap-4">
        <Avatar
          defaultValue={"/images/obat-icon.svg"}
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
      <div className="bg-white p-4 sm:px-16">
        <p className="font-bold text-lg">Lengkapi Profil</p>
        <div className="mt-4">
          <div className="grid gap-4 pb-6">
            <Input
              type="text"
              label="Nama"
              variant="bordered"
              placeholder="nama lengkap"
              onChange={handleChange("name")}
            />
            <Input
              type="email"
              label="Email"
              placeholder="email"
              variant="bordered"
              onChange={handleChange("email")}
            />
            <Input
              type="password"
              label="Password"
              placeholder="password"
              variant="bordered"
              onChange={handleChange("password")}
            />
            <RadioGroup
              label="Jenis Kelamin"
              onValueChange={(value) => setUserData({ ...userData, jenis_kelamin: value })}
            >
              <Radio value="laki-laki">Laki-laki</Radio>
              <Radio value="perempuan">Perempuan</Radio>
            </RadioGroup>
            <Input
              type="text"
              label="Nomor STR"
              variant="bordered"
              onChange={handleChange("no_str")}
            />
            <Input
              type="text"
              label="Nomor SIP"
              variant="bordered"
              onChange={handleChange("no_sip")}
            />
            <Input
              type="text"
              label="Tempat Praktek"
              variant="bordered"
              onChange={handleChange("status_keanggotaan")}
            />
            <Input
              type="text"
              label="Pengalaman"
              variant="bordered"
              onChange={handleChange("pengalaman")}
            />
            <Input
              type="text"
              label="Riwayat Pendidikan"
              variant="bordered"
              onChange={handleChange("riwayat_pendidikan")}
            />
            <Input
              type="text"
              label="Keahlian"
              variant="bordered"
              onChange={handleChange("keahlian")}
            />
            <Input
              type="text"
              label="Alamat"
              variant="bordered"
              onChange={handleChange("alamat")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddPengguna({ penggunaData, setPenggunaData, previewUrl, handleFileChange, handleChange }) {
  return (
    <div className="flex flex-col px-4 py-4 gap-4">
      <div className="bg-white flex flex-col justify-start items-center py-6 gap-4">
        <Avatar
          defaultValue={"/images/obat-icon.svg"}
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
      <div className="bg-white p-4 sm:px-16">
        <p className="font-bold text-lg">Lengkapi Profil</p>
        <div className="mt-4">
          <div className="grid gap-4 pb-6">
            <Input
              type="text"
              label="Nama"
              variant="bordered"
              placeholder="nama lengkap"
              onChange={handleChange("name")}
            />
            <Input
              type="email"
              label="Email"
              placeholder="email"
              variant="bordered"
              onChange={handleChange("email")}
            />
            <Input
              type="password"
              label="Password"
              placeholder="password"
              variant="bordered"
              onChange={handleChange("password")}
            />
            <RadioGroup
              label="Jenis Kelamin"
              onValueChange={(value) => setPenggunaData({ ...penggunaData, jenis_kelamin: value })}
            >
              <Radio value="laki-laki">Laki-laki</Radio>
              <Radio value="perempuan">Perempuan</Radio>
            </RadioGroup>
            {/* <Input
              type="text"
              label="Nomor STR"
              variant="bordered"
              onChange={handleChange("no_str")}
            />
            <Input
              type="text"
              label="Nomor SIP"
              variant="bordered"
              onChange={handleChange("no_sip")}
            />
            <Input
              type="text"
              label="Tempat Praktek"
              variant="bordered"
              onChange={handleChange("status_keanggotaan")}
            />
            <Input
              type="text"
              label="Pengalaman"
              variant="bordered"
              onChange={handleChange("pengalaman")}
            />
            <Input
              type="text"
              label="Riwayat Pendidikan"
              variant="bordered"
              onChange={handleChange("riwayat_pendidikan")}
            />
            <Input
              type="text"
              label="Keahlian"
              variant="bordered"
              onChange={handleChange("keahlian")}
            />
            <Input
              type="text"
              label="Alamat"
              variant="bordered"
              onChange={handleChange("alamat")}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
