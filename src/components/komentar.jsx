"use client";
import { getUser } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import { Textarea, Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Komentar({ parent_id, onSubmit, id_diskusi, checkUser }) {
  const [komentar, setKomentar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname()

  // Function to update the comment count in the diskusi table
  async function updateCommentCount(diskusiId) {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('diskusi')
        .select('jml_komentar')
        .eq('id', diskusiId)
        .single();

      if (error) {
        throw error;
      }

      const newCommentCount = (data.jml_komentar || 0) + 1;

      const { error: updateError } = await supabase
        .from('diskusi')
        .update({ jml_komentar: newCommentCount })
        .eq('id', diskusiId);

      if (updateError) {
        throw updateError;
      }

      console.log('Comment count updated successfully');
    } catch (error) {
      console.error('Error updating comment count:', error);
    }
  }
  const router = useRouter();

  async function hanldeSubmit() {
    setIsLoading(true);
    const user = await getUser();
    if(!user){
      return router.push('/login');
    }
    const role = user?.user_metadata?.role || 'pengguna';
    const userIdField = role === 'apoteker' ? 'id_apoteker' : 'id_pengguna';
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("komentar_diskusi")
        .insert({ isi: komentar, parent_id: parent_id || null, [userIdField]: user?.id, id_diskusi: id_diskusi });

      if (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Gagal Membuat Komentar Baru", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        // Update the comment count after successful comment insertion
        await updateCommentCount(id_diskusi);

        toast.success("Berhasil Membuat Komentar Baru", {
          position: "top-center",
          autoClose: 1500,
        });
        onSubmit && onSubmit();
        setIsLoading(false);
        setKomentar(""); // Clear the textarea after successful submission
        revalidatePath(pathName);
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

      <div className="flex justify-end rounded-xl mt-1">
        <Button  onPress={hanldeSubmit} isLoading={isLoading} isDisabled={!komentar} className="bg-[#EE0037] text-white" size="sm">
          Submit
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
