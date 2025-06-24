import Link from "next/link";
import { Image } from "@heroui/react";

export default function NavHero() {
  const navItems = [
    {
      href: "/obat-a-z",
      image: "./images/1.svg",
      title: "Obat A-Z",
      isComingSoon: false
    },
    {
      href: "/tanya-apoteker",
      image: "./images/2.svg",
      title: "Tanya Apoteker",
      isComingSoon: false
    },
    {
      href: "/forum-kesehatan",
      image: "./images/3.svg",
      title: "Forum Kesehatan",
      isComingSoon: false
    },
    {
      href: "#",
      image: "./images/4.svg",
      title: "Home Care",
      isComingSoon: true
    },
    {
      href: "#",
      image: "./images/5.svg",
      title: "Cari Apotek",
      isComingSoon: true
    },
    {
      href: "#",
      image: "./images/6.svg",
      title: "Swamedikasi",
      isComingSoon: true
    }
  ];

  return (
    <div className="mt-2 pt-1 grid grid-cols-3 gap-4 md:flex md:flex-wrap md:gap-6 md:justify-start">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2  transition-all duration-300 group-hover:shadow-md sm:h-16 sm:w-16">
            {item.isComingSoon ? (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-center text-white">
                <span className="text-xs font-semibold">Coming</span>
                <span className="text-xs font-semibold">Soon</span>
              </div>
            ) : (
              <Image
                src={item.image}
                alt={item.title}
                isZoomed
                className="max-h-[85%] w-auto rounded-full object-contain"
                height={80}
                width={80}
              />
            )}
          </div>
          <div className="mt-2 text-center">
            <span className="relative text-xs font-medium text-gray-800 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
              {item.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}