"use client";
import { Input, RadioGroup, Radio, Button, Avatar, ModalFooter, ModalHeader } from "@heroui/react";
import { getUserFromDatabase } from "@/services/getUserFromDatabase";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Image,
} from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
export default function EditProfil({user}) {
  const [nama, setNama] = useState(user?.nama);
  const [email, setEmail] = useState(user?.email);
  const [kelamin, setKelamin] = useState(user?.jenis_kelamin);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewUrl, setPreviewUrl] = useState(user?.picture);
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (user) {
      updateUser(user?.id, nama, email, kelamin, image);
    }
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
  async function uploadImage(file) {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("artikel")
        .upload(`picture_pengguna/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        toast.error("Image upload failed");
        return null;
      }

      if (data) {
        const { data: publicUrl, error: publicUrlError } = supabase.storage
          .from("artikel")
          .getPublicUrl(`picture_pengguna/${fileName}`);

        if (publicUrlError) {
          console.error(publicUrlError);
          toast.error("Failed to get image public URL");
          return null;
        }

        return publicUrl.publicUrl;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during image upload");
      return null;
    }
  }

  async function updateUser(id, nama, email, jenis_kelamin, image) {
    setIsLoading(true);
    try {
      const picture = image ? await uploadImage(image) : user?.picture;
      const supabase = createClient();
      const { error } = await supabase
        .from("pengguna")
        .update({ nama: nama, email: email, jenis_kelamin: jenis_kelamin, picture: picture })
        .eq("id", id);
  
      if (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Tidak dapat perbarui profil")
      }

  
      toast.success("Behasil perbarui profil")

      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className="flex flex-col px-4 py-4 gap-4 sm:flex-row ">
      <div className="bg-white flex flex-col justify-center items-center py-6 gap-4 sm:w-1/3">
        <Avatar
          isBordered={false}
          radius="full"
          className=" w-32 h-42  sm:w-52"
          src={
            previewUrl ||
            "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
          }
        />
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-md sm:text-lg">{user?.nama}</p>
          <p>{user?.email}</p>
        </div>
        <label className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          Ganti Gambar
          <input
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            id="dropzone-file"
            type="file"
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className=" bg-white p-4 sm:w-2/3 sm:px-16">
        <p className="font-bold text-lg">Edit Profil</p>
        <div className=" mt-4 ">
          <div className="grid gap-4 pb-6 " action="">
            <Input
              type="nama"
              label="Nama"
              variant="bordered"
              defaultValue={user?.nama}
              onChange={(value) => setNama(value.target.value)}
            />
            <Input
            isDisabled
              type="email"
              label="Email"
              placeholder={user?.email}
              defaultValue={user?.email}
              variant="bordered"
              onChange={(value) => setEmail(value.target.value)}
            />

            <RadioGroup
              label="Jenis Kelamin"
              defaultValue={user?.jenis_kelamin}
              onValueChange={(value) => setKelamin(value)}
            >
              <Radio value="laki-laki">Laki-laki</Radio>
              <Radio value="perempuan">Perempuan</Radio>
            </RadioGroup>

            <Button
              onPress={onOpen}
              className="mt-4"
              type="submit"
              variant="ghost"
                                    color="primary"
            >
              Update Profile
            </Button>
          </div>
          <Modal
            hideCloseButton
            placement="center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Simpan Perubahan
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-lg">Apakah anda yakin?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" variant="flat" onPress={onClose}>
                      Batal
                    </Button>
                    <Button
                      isLoading={isLoading}
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Simpan
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
