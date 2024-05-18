import Link from "next/link";
import { Image } from "@nextui-org/react";

export default function NavHero(){
    return(
        <div className="flex gap-4 mt-6 justify-start">
            <Link href={"/obat-a-z"} className="flex flex-col items-center min-w-24  ">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-slate-100 rounded-full flex justify-center items-center">
                <Image
                src="./images/obat-icon.svg"
                isZoomed
                className=" max-h-[85px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className=" border-b-[1.5px]  flex justify-center items-center  mt-2 text-xs font-semibold">
                Obat A-Z
              </p>
            </Link>

            <Link href={"/tanya-apoteker"} className="flex flex-col justify-center items-center min-w-24">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-slate-100 rounded-full flex justify-center items-center">
              <Image
                src="./images/forum-icon.svg"
                isZoomed
                className=" max-h-[85px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className="border-b-[1.5px]  flex justify-center items-center  mt-2 text-xs font-semibold">
                Tanya Apoteker
              </p>
            </Link>

            <Link href={"/forum-kesehatan"} className="flex flex-col justify-center items-center min-w-24">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-slate-100 rounded-full flex justify-center items-center">
              <Image
                src="./images/ask-apoteker-icon.svg"
                isZoomed
                className=" max-h-[85px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className=" border-b-[1.5px] flex justify-center items-center  mt-2 text-xs font-semibold">
                Forum Kesehatan
              </p>
            </Link>
          </div>
    )
}