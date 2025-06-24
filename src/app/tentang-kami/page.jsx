import React from 'react';
import Image from 'next/image';

export default function TentangKami() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative bg-blue-400 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 py-20 lg:py-32">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Tentang Kami</h1>
            <p className="text-lg md:text-xl mb-8">
              Mengenal lebih dekat dengan Medisigna, partner terpercaya Anda dalam perjalanan menuju hidup yang lebih sehat.
            </p>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image 
              src="/images/hero.svg" 
              alt="Tentang Kami Hero"
              width={500} 
              height={500} 
              className="mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        {/* Tentang Medisigna */}
        <section id="tentang-medisigna" className="flex flex-col md:flex-row items-center mb-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image 
              src="/images/medisigna.png" 
              alt="Medisigna Logo" 
              width={400} 
              height={150} 
              className="mx-auto"
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Medisigna</h2>
            <p className="text-gray-600 leading-relaxed">
              Medisigna adalah platform kesehatan digital terdepan di Indonesia yang berkomitmen untuk memberikan akses informasi dan layanan kesehatan yang mudah, cepat, dan terpercaya. Didirikan dengan semangat untuk memberdayakan masyarakat, kami menghubungkan pasien dengan apoteker profesional untuk konsultasi online, menyediakan informasi lengkap seputar obat-obatan, dan membangun komunitas kesehatan yang solid.
            </p>
          </div>
        </section>

        {/* Visi & Misi */}
        <section id="visi-misi" className="bg-white rounded-lg p-10 mb-20">
            <div className="grid md:grid-cols-2 gap-10 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Visi Kami</h2>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform kesehatan digital nomor satu di Indonesia yang memberdayakan masyarakat untuk mengambil kendali atas kesehatan mereka dan hidup lebih sehat melalui pemanfaatan teknologi secara inovatif.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Misi Kami</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>Memberikan akses yang mudah dan cepat ke informasi kesehatan yang akurat dan terverifikasi.</li>
                  <li>Menyediakan layanan konsultasi yang aman dan nyaman dengan tenaga kesehatan profesional.</li>
                  <li>Membangun sebuah komunitas kesehatan yang suportif, edukatif, dan inklusif bagi semua orang.</li>
                </ul>
              </div>
            </div>
        </section>

        {/* Apa yang kami tawarkan */}
        <section id="penawaran">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Apa yang Kami Tawarkan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg  text-center transform hover:scale-105 transition-transform duration-300">
              <Image src="/images/2.svg" alt="Tanya Apoteker" width={80} height={80} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tanya Apoteker</h3>
              <p className="text-gray-600">Konsultasi langsung dengan apoteker berlisensi untuk mendapatkan jawaban atas pertanyaan kesehatan Anda secara real-time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg  text-center transform hover:scale-105 transition-transform duration-300">
              <Image src="/images/1.svg" alt="Informasi Obat" width={80} height={80} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Informasi Obat A-Z</h3>
              <p className="text-gray-600">Akses database lengkap obat-obatan, termasuk informasi mengenai dosis, efek samping, dan interaksi obat.</p>
            </div>
            <div className="bg-white p-6 rounded-lg  text-center transform hover:scale-105 transition-transform duration-300">
              <Image src="/images/3.svg" alt="Forum Kesehatan" width={80} height={80} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Forum Kesehatan</h3>
              <p className="text-gray-600">Bergabunglah dengan komunitas kami untuk berbagi pengalaman, bertanya, dan mendapatkan dukungan dari sesama pengguna.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
