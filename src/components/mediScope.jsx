"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MediScope() {
  const [loadedVideos, setLoadedVideos] = useState([]);
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const videoId = entry.target.dataset.videoid;
            if (videoId && !loadedVideos.includes(videoId)) {
              setLoadedVideos(prev => [...prev, videoId]);
            }
          }
        });
      },
      { rootMargin: "100px" }
    );

    const placeholders = document.querySelectorAll(".video-placeholder");
    placeholders.forEach(placeholder => {
      observer.observe(placeholder);
    });

    return () => {
      placeholders.forEach(placeholder => {
        observer.unobserve(placeholder);
      });
    };
  }, [loadedVideos]);

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
          <div key={video.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div 
              className="aspect-video mb-3 video-placeholder bg-gray-100 flex items-center justify-center relative rounded-lg overflow-hidden" 
              data-videoid={video.videoId}
            >
              {loadedVideos.includes(video.videoId) ? (
                <iframe 
                  className="w-full h-full absolute top-0 left-0"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center relative z-10">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                  </div>
                </>
              )}
            </div>
            <h4 className="font-semibold text-sm sm:text-base line-clamp-2">{video.title}</h4>
            <p className="text-xs text-gray-500">{video.channel}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 