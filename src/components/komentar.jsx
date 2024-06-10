"use client";
import { Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
export default function Komentar() {
  const [komentar, setKomentar] = useState("");

  return (
    <>
      <div className="bg-white rounded-xl">
        <Textarea
          placeholder="Komentar"
          variant="bordered"
          fullWidth
          size="sm"
          onChange={(e) => setKomentar(e.target.value)}
        />
      </div>

      <div className=" flex justify-end rounded-xl mt-1">
        <Button isDisabled ={!komentar} className="bg-[#EE0037] text-white" size="sm">
          Submit
        </Button>
      </div>
    </>
  );
}
