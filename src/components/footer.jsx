'use client'
import { Image } from "@nextui-org/react"
import Link from "next/link"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { usePathname } from "next/navigation";
export default function Footer() {
    const header = ["/apoteker", "/admin"];
   
  const pathName = usePathname();
  const showHeader = header.some(path => pathName.includes(path)) || /^\/tanya-apoteker\/chat\/[a-f0-9-]+$/.test(pathName) ;
  
    return (
        <>
        {!showHeader &&
        <footer className="w-full bottom-0 px-4 py-6 sm:mb-0 bg-blue-500 mt-16">
            <div className="gap-4 sm:flex sm:gap-8 sm:px-20 sm:py-10 sm:justify-between">
                <div className="mb-6">
                    <h2 className="font-bold text-2xl text-white">Medisigna</h2>
                    <div className="flex gap-2 mt-4">
                        <Image isZoomed className="w-8" height={100} src="./images/facebook-icon.png"/>
                        <Image isZoomed className="w-8" height={100} src="./images/ig-icon.png"/>
                        <Image isZoomed className="w-8" height={100} src="./images/yt-icon.png"/>
                        <Image isZoomed className="w-8" height={100} src="./images/tt-icon.png"/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h5 className="font-bold text-lg text-white mb-2">Site Map</h5>
                    <div className="flex flex-col gap-2">

                    <Link className="text-white" href={"/artikel"}>Artikel</Link>
                    <Link className="text-white" href={"/obat-a-z"}>Obat A-Z</Link>
                    <Link className="text-white" href={"/tanya-apoteker"}>Tanya Apoteker</Link>
                    <Link className="text-white" href={"/forum-kesehatan"}>Forum Kesehatan</Link>
                    </div>
                </div>
                <div className="flex flex-col mt-4 sm:mt-0">
                    <h5 className="font-bold text-lg text-white mb-2">Contact</h5>
                    <div className="flex flex-col gap-2">
                        <div className="flex ">
                        <EnvelopeIcon className="w-4 mr-2" color="white"/>
                        <p className="text-white">Medisigna@gmail.com</p>
                        </div>
                        <div className="flex ">
                        <PhoneIcon className="w-4 mr-2" color="white"/>
                        <p className="text-white">00 123 456 789</p>
                        </div>
                        <div className="flex ">
                        <MapPinIcon className="w-4 mr-2" color="white"/>
                        <p className="text-white">Aikmel</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 mb-12 sm:mb-0 justify-center items-center">
                <hr />
                <p className="text-center text-white mt-4 text-xs sm:text-md">Copyright © 2024 Medisigna. All rights reserved.</p>
            </div>

        </footer>
        }
        </>
    )
}