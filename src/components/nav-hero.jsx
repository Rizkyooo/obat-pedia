import Link from "next/link";
import { Image } from "@nextui-org/react";

export default function NavHero(){
    return(
        <div className="gap-4 mt-6 justify-start grid grid-cols-3 md:flex">
            <Link href={"/obat-a-z"} className="flex flex-col items-center min-w-24  ">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-2xl flex justify-center items-center">
                <Image
                src="./images/obataz.png"
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
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-2xl flex justify-center items-center">
              <Image
                src="./images/chats.png"
                isZoomed
                className=" max-h-[75px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className="border-b-[1.5px]  flex justify-center items-center  mt-2 text-xs font-semibold">
                Tanya Apoteker
              </p>
            </Link>

            <Link href={"/forum-kesehatan"} className="flex flex-col justify-center items-center min-w-24">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-2xl flex justify-center items-center">
              <Image
                src="./images/forumd.png"
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
            <Link href={"#"} className="flex flex-col items-center min-w-24  ">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-2xl flex justify-center items-center relative">
                <div className="absolute z-20 -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-[8px] font-medium py-0.5 px-1.5 rounded-full">
                  Coming Soon
                </div>
                <Image
                src="./images/homec.png"
                isZoomed
                className=" max-h-[85px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className=" border-b-[1.5px]  flex justify-center items-center  mt-2 text-xs font-semibold">
                Home Care
              </p>
            </Link>

            <Link href={"#"} className="flex flex-col justify-center items-center min-w-24">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-2xl flex justify-center items-center relative">
              <div className="absolute z-20 -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-[8px] font-medium py-0.5 px-1.5 rounded-full">
                Coming Soon
              </div>
              <Image
                src="./images/apotek.png"
                isZoomed
                className=" max-h-[85px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className="border-b-[1.5px]  flex justify-center items-center  mt-2 text-xs font-semibold">
                Cari Apotek
              </p>
            </Link>

            <Link href={"#"} className="flex flex-col justify-center items-center min-w-24">
              <div className=" p-2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-2xl flex justify-center items-center relative">
              <div className="absolute z-20 -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-[8px] font-medium py-0.5 px-1.5 rounded-full">
                Coming Soon
              </div>
              <Image
                src="./images/swam.png"
                isZoomed
                className=" max-h-[85px] rounded-full"
                height={100}
                width={100}
                />
              </div>
              <p className=" border-b-[1.5px] flex justify-center items-center  mt-2 text-xs font-semibold">
                Swamedikasi
              </p>
            </Link>
          </div>
    )
}