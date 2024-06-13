"use client";
import { getUser } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import { Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Komentar({parent_id, onSubmit, id_diskusi}) {
  const [komentar, setKomentar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function hanldeSubmit() {
    setIsLoading(true);
    const user =  await getUser()
    const role = user?.user_metadata?.role || 'pengguna'
    const userIdField = role === 'apoteker' ? 'id_apoteker' : 'id_pengguna';
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("komentar_diskusi")
        .insert({isi: komentar, parent_id: parent_id || null, [userIdField]: user?.id, id_diskusi: id_diskusi},);
      if (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Gagal Membuat Diskusi Baru", {
          position: "top-center",
          autoClose: 2000,
        })
      } else {
        toast.success("Berhasil Membuat Diskusi Baru", {
          position: "top-center",
          autoClose: 1500,
        })
        onSubmit && onSubmit();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div className="bg-white rounded-xl">
        <Textarea
          placeholder="Komentar"
          variant="bordered"
          fullWidth
          size="sm"
          onChange={(e) => setKomentar(e.target.value)}
          value={komentar}
        />
      </div>

      <div className=" flex justify-end rounded-xl mt-1">
        <Button onPress={hanldeSubmit} isLoading={isLoading} isDisabled ={!komentar} className="bg-[#EE0037] text-white" size="sm">
          Submit
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
