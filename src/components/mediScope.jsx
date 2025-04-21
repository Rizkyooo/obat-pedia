"use client";
import Link from "next/link";

export default function MediScope() {
  // Sample YouTube video data
  const videos = [
    {
      id: "1",
      title: "APA AJA SIH YANG DILAKUKAN APOTEKER?",
      videoId: "RDTM8U58uRg", // Replace with actual YouTube video ID
      channel: "Pharmacy Tips"
    },
    {
      id: "6",
      title: "What Pharmacist Do",
      videoId: "IsBmd855hbg", // Replace with actual YouTube video ID
      channel: "Health Education"
    },
    {
      id: "2",
      title: "A carrier in pharmacy",
      videoId: "t2dvY86rHyc", // Replace with actual YouTube video ID
      channel: "Medical Insights"
    },
    {
      id: "3",
      title: "Is Becoming a Pharmacist Still Worth It? REAL Pros and Cons of a Career in Pharmacy",
      videoId: "ZuuxdVly65k", // Replace with actual YouTube video ID
      channel: "Pharmacy Tips"
    },
    {
      id: "4",
      title: "Understanding Common Medications",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
      channel: "Health Education"
    },
    {
      id: "5",
      title: "A day in the life of a Pharmacist",
      videoId: "Wjkr-YbytmM", // Replace with actual YouTube video ID
      channel: "Medical Insights"
    },
  ];

  return (
    <div className="container mx-auto sm:px-14">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4 sm:text-3xl">
          MediScope
        </h3>
        {/* <Link className="text-blue-500 font-semibold sm:hidden pr-4" href={"/mediscope"}>
          Lihat Semua
        </Link> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white p-4 rounded-xl ">
            <div className="aspect-video mb-3">
              <iframe 
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h4 className="font-semibold text-sm sm:text-base">{video.title}</h4>
            <p className="text-xs text-gray-500">{video.channel}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 