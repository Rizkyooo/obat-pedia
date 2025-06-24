'use client'
import { Image } from "@heroui/react"
import Link from "next/link"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { usePathname } from "next/navigation";

export default function Footer() {
    const header = ["/apoteker", "/admin"];
    const pathName = usePathname();
    const showHeader = header.some(path => pathName.includes(path)) || /^\/tanya-apoteker\/chat\/[a-f0-9-]+$/.test(pathName);

    return (
        <>
        {!showHeader &&
        <footer className="bg-blue-400 py-12 px-4 w-full mt-16 border-t border-blue-400">
            <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-8 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
                {/* Brand & Social */}
                <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
                    <h2 className="text-3xl font-extrabold text-white mb-4">Medisigna</h2>
                    <div className="flex gap-4 mb-2">
                        {[
                          { href: "https://facebook.com", src: "/images/sos1.svg", alt: "Facebook" },
                          { href: "https://instagram.com", src: "/images/sos2.svg", alt: "Instagram" },
                          { href: "https://youtube.com", src: "/images/sos3.svg", alt: "YouTube" },
                          { href: "https://tiktok.com", src: "/images/sos4.svg", alt: "TikTok" },
                        ].map((icon) => (
                          <a
                            key={icon.alt}
                            href={icon.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={icon.alt}
                            className="w-14 h-14 flex items-center justify-center rounded-full bg-white hover:scale-110 hover:bg-white transition"
                          >
                            <Image isZoomed className="h-10 w-10" height={52} width={52} src={icon.src} alt={icon.alt} />
                          </a>
                        ))}
                    </div>
                </div>
                {/* Site Map */}
                <nav className="flex flex-col items-center md:items-start w-full md:w-1/3">
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Site Map</h3>
                    <ul className="space-y-2">
                        <li><Link href="/artikel" className="text-white hover:underline">Artikel</Link></li>
                        <li><Link href="/obat-a-z" className="text-white hover:underline">Obat A-Z</Link></li>
                        <li><Link href="/tanya-apoteker" className="text-white hover:underline">Tanya Apoteker</Link></li>
                        <li><Link href="/forum-kesehatan" className="text-white hover:underline">Forum Kesehatan</Link></li>
                    </ul>
                </nav>
                {/* Contact */}
                <address className="not-italic flex flex-col items-center md:items-start w-full md:w-1/3 bg-white/10 rounded-xl p-4 mt-6 md:mt-0">
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Contact</h3>
                    <a href="mailto:Medisigna@gmail.com" className="flex items-center text-white hover:underline mb-2">
                        <EnvelopeIcon className="w-5 h-5 mr-2" color="white" /> Medisigna@gmail.com
                    </a>
                    <a href="tel:00123456789" className="flex items-center text-white hover:underline mb-2">
                        <PhoneIcon className="w-5 h-5 mr-2" color="white" /> 00 123 456 789
                    </a>
                    <div className="flex items-center text-white">
                        <MapPinIcon className="w-5 h-5 mr-2" color="white" /> Aikmel
                    </div>
                </address>
            </div>
            <div className="text-center text-blue-100 text-xs mt-8">
                &copy; {new Date().getFullYear()} Medisigna. All rights reserved.
            </div>
        </footer>
        }
        </>
    )
}