"use client";
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
} from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function EditProfil({ user }) {
  const [userData, setUserData] = useState({
    nama: user?.nama,
    email: user?.email,
    jenis_kelamin: user?.jenis_kelamin,
    picture: user?.picture,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewUrl, setPreviewUrl] = useState(user?.picture);
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

  const supabase = createClient();

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file?.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("artikel")
        .upload(`picture_admin/${fileName}`, file, {
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
        .getPublicUrl(`picture_admin/${fileName}`);

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

  const updateUser = async () => {
    setIsLoading(true);
    try {
      const picture = image ? await uploadImage(image) : userData.picture;

      const { error } = await supabase
        .from("admin")
        .update({
          ...userData,
          picture,
        })
        .eq("id", user?.id);

      if (error) {
        console.log(error);
        setIsLoading(false);
        return toast.error("Tidak dapat perbarui profil");
      }

      toast.success("Behasil perbarui profil");
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-4 py-4 gap-4 sm:flex-row ">
      <div className="bg-white flex flex-col justify-start items-center py-6 gap-4 sm:w-1/3">
        <Avatar
          isBordered={false}
          radius="full"
          className=" w-32 h-42  sm:w-52"
          src={previewUrl}
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
          <div className="grid gap-4 pb-6">
            <Input
              type="nama"
              label="Nama"
              variant="bordered"
              defaultValue={userData.nama}
              onChange={handleChange("nama")}
            />
            <Input
              isDisabled
              type="email"
              label="Email"
              placeholder={userData.email}
              defaultValue={userData.email}
              variant="bordered"
              onChange={handleChange("email")}
            />
            <RadioGroup
              label="Jenis Kelamin"
              defaultValue={userData.jenis_kelamin}
              onValueChange={(value) =>
                setUserData({ ...userData, jenis_kelamin: value })
              }
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
                      onClick={() => {
                        updateUser();
                        onClose();
                      }}
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
