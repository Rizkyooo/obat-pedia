"use client";
import { Textarea, Button } from "@nextui-org/react";
export default function Komentar() {
  return (
    <>
      <div className="bg-white rounded-xl">
        <Textarea
          placeholder="Komentar"
          variant="bordered"
          fullWidth
          size="md"
        />
      </div>

      <div className=" flex justify-end rounded-xl">
        <Button className="bg-[#EE0037] text-white" size="sm">
          Submit
        </Button>
      </div>
    </>
  );
}
